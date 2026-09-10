import { createClient } from 'next-sanity';

const apiVersion = '2025-01-01';

export function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  if (!projectId) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Configure it before deploying the site.');
    }

    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    // Portfolio updates should be visible as soon as they are published in Sanity.
    // Avoid the CDN's eventual-consistency window for this small, low-traffic site.
    useCdn: false,
    perspective: 'published',
  });
}
