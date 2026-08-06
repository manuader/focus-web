import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * One page. The sections are anchors on it, not routes, so listing them
 * here would just be duplicate URLs pointing at the same document.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
