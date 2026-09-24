import { NextResponse, type NextRequest } from "next/server";

type ManagedRoute = { path?: string; enabled?: boolean };
type SpecialPages = {
  routes?: ManagedRoute[] | null;
  friendshipEnabled?: boolean;
  sendYwyEnabled?: boolean;
};

const coreSections = new Set(["about", "projects", "resume", "contact", "blog", "works"]);

function normalizePath(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function isCoreSitePath(path: string) {
  if (path === "/" || path === "/zh" || path === "/admin" || path.startsWith("/admin/") || path === "/studio" || path.startsWith("/studio/")) return true;
  if (/^\/[^/]+\.[^/]+$/.test(path)) return true;
  const segments = path.split("/");
  return segments[1] === "zh" && coreSections.has(segments[2]);
}

async function getSpecialPages(): Promise<SpecialPages | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return process.env.NODE_ENV === "production" ? null : {};

  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const query = '*[_id == "specialPages"][0]{routes[]{path,enabled},friendshipEnabled,sendYwyEnabled}';
  const url = new URL(`https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}`);
  url.searchParams.set("query", query);

  try {
    const response = await fetch(url, { headers: { "Cache-Control": "no-store" } });
    if (!response.ok) throw new Error(`Sanity returned ${response.status}`);
    const data = (await response.json()) as { result: SpecialPages | null };
    return data.result ?? {};
  } catch (error) {
    console.error("Unable to check managed route visibility.", error);
    return null;
  }
}

function managedRoutes(settings: SpecialPages): ManagedRoute[] {
  if (Array.isArray(settings.routes)) return settings.routes;
  // Read older documents until their fixed switches are migrated to route rows.
  return [
    { path: "/friendship", enabled: settings.friendshipEnabled !== false },
    { path: "/send-ywy", enabled: settings.sendYwyEnabled !== false },
  ];
}

export async function proxy(request: NextRequest) {
  const pathname = normalizePath(request.nextUrl.pathname);
  const imageSource = pathname === "/_next/image" ? request.nextUrl.searchParams.get("url") : null;
  if (pathname === "/_next/image" && (!imageSource || !imageSource.startsWith("/"))) return NextResponse.next();
  // The existing Chinese shortcut serves the same page as /send-ywy.
  const routePath = pathname === "/zh/send-ywy" ? "/send-ywy" : normalizePath(imageSource?.split("?")[0] || pathname);
  if (isCoreSitePath(routePath)) return NextResponse.next();

  const settings = await getSpecialPages();
  const hidden = settings === null || managedRoutes(settings).some((route) => {
    if (route.enabled === true || typeof route.path !== "string" || !route.path.startsWith("/")) return false;
    const root = normalizePath(route.path);
    return root !== "/" && (routePath === root || routePath.startsWith(`${root}/`));
  });

  if (hidden) {
    return new NextResponse(null, {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/webpack-hmr).*)",
};
