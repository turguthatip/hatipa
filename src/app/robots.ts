import type { MetadataRoute } from "next";

/**
 * Blocks all crawlers while the site is on a temporary domain.
 * Remove this once the site is live on the final domain.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
