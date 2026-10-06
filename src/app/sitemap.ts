import type { MetadataRoute } from "next";
import { portfolioData } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl(portfolioData.site.url).origin;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...portfolioData.projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.7,
    })),
    ...portfolioData.certifications.map((certification) => ({
      url: `${baseUrl}/certifications/${certification.id}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...portfolioData.achievements.map((achievement) => ({
      url: `${baseUrl}/achievements/${achievement.id}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
