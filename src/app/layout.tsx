import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
// `standard` carries wght + wdth + opsz in one file. The package default
// (index.css) is weight-only, which is why `font-variation-settings: "opsz"`
// has been dead code; `opsz.css` is the mirror trap, optical size but no
// weight axis, which would flatten every heading on the site to one weight.
import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
// the logotype (Cinzel Bold) and its tagline (Montserrat Medium), per the brand kit
import "@fontsource/cinzel/latin-700.css";
import "@fontsource/montserrat/latin-500.css";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PlaceholderToggle } from "@/components/site/PlaceholderToggle";
import { ErrorReporter } from "@/components/site/ErrorReporter";
import { showPlaceholders } from "@/lib/placeholders";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, orgJsonLd } from "@/lib/seo";
import { site } from "@/content/site";
import { authors } from "@/content/authors";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...buildMetadata({}),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  applicationName: site.name,
  authors: authors.map((a) => ({ name: a.name, url: `${site.url}/about#${a.slug}` })),
  creator: site.name,
  publisher: site.legalName,
  category: "Business consulting",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      {/* placeholder flags are a development aid: in production they read as ordinary text */}
      <body className={showPlaceholders ? undefined : "ph-hidden"}>
        <JsonLd data={orgJsonLd(authors)} />
        <Nav />
        <main className="relative">{children}</main>
        <Footer />
        <PlaceholderToggle />
        <ErrorReporter />
      </body>
    </html>
  );
}
