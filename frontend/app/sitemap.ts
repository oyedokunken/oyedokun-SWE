import { MetadataRoute } from "next";
import { infoPages, showcasePages, SITE_URL } from "@/data/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...Object.values(showcasePages).map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...infoPages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
