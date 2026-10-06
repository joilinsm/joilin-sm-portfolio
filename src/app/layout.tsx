import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { portfolioData } from "@/data/portfolio";
import { getSiteUrl, hasContent, isUsableHref } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const configuredSiteUrl = hasContent(portfolioData.site.url)
  ? portfolioData.site.url
  : undefined;

export const metadata: Metadata = {
  metadataBase: getSiteUrl(portfolioData.site.url),
  title: {
    default: portfolioData.site.title,
    template: `%s — ${portfolioData.profile.name}`,
  },
  description: portfolioData.site.description,
  applicationName: `${portfolioData.profile.name} Portfolio`,
  keywords: [
    "Computer Science and Business Systems",
    "Business Information Systems",
    "Data Analytics",
    "Business Analysis",
    "Business Intelligence",
    "Digital Transformation",
    "Master's Germany",
  ],
  authors: [{ name: portfolioData.profile.name }],
  creator: portfolioData.profile.name,
  alternates: configuredSiteUrl ? { canonical: configuredSiteUrl } : undefined,
  openGraph: {
    type: "profile",
    title: portfolioData.site.title,
    description: portfolioData.site.description,
    url: configuredSiteUrl,
    siteName: `${portfolioData.profile.name} Portfolio`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.site.title,
    description: portfolioData.site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1720" },
  ],
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolioData.profile.name,
  url: configuredSiteUrl,
  description: portfolioData.profile.headline,
  knowsAbout: portfolioData.academicInterests,
  sameAs: portfolioData.socialLinks
    .map((link) => link.href)
    .filter((href) => isUsableHref(href) && href.startsWith("http")),
};

const themeScript = `
  try {
    const saved = localStorage.getItem("portfolio-theme");
    const dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch (_) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
      >
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader
          name={portfolioData.profile.name}
          monogram={portfolioData.profile.shortName}
        />
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
