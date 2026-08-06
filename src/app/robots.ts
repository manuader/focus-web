import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * Everything is public and there is nothing to hide from crawlers, including
 * the AI ones: being quotable is the point of the GEO work.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
