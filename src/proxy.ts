import { NextResponse, type NextRequest } from "next/server";

type SpecialPages = {
  friendshipEnabled?: boolean;
  sendYwyEnabled?: boolean;
};

async function getSpecialPages(): Promise<SpecialPages | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return process.env.NODE_ENV === "production" ? null : {};

  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const query = '*[_id == "specialPages"][0]{friendshipEnabled,sendYwyEnabled}';
  const url = new URL(`https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}`);
  url.searchParams.set("query", query);

  try {
    const response = await fetch(url, { headers: { "Cache-Control": "no-store" } });
    if (!response.ok) throw new Error(`Sanity returned ${response.status}`);
    const data = (await response.json()) as { result: SpecialPages | null };
    return data.result ?? {};
  } catch (error) {
    console.error("Unable to check special page visibility.", error);
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const settings = await getSpecialPages();
  const friendship = pathname === "/friendship" || pathname.startsWith("/friendship/");
  const enabled = friendship ? settings?.friendshipEnabled !== false : settings?.sendYwyEnabled !== false;

  if (settings === null || !enabled) {
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
  matcher: ["/friendship/:path*", "/send-ywy/:path*", "/zh/send-ywy/:path*"],
};
