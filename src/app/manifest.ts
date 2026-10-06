import type { MetadataRoute } from "next";
import { portfolioData } from "@/data/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: portfolioData.site.title,
    short_name: portfolioData.profile.name,
    description: portfolioData.site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f4",
    theme_color: "#10243e",
  };
}
