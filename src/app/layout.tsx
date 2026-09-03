import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Spine } from "@/components/site/Spine";
import { PlaceholderToggle } from "@/components/site/PlaceholderToggle";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildMetadata, orgJsonLd } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...buildMetadata({}),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
};

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <JsonLd data={orgJsonLd()} />
        <Spine />
        <Nav />
        <main className="relative">{children}</main>
        <Footer />
        <PlaceholderToggle />
      </body>
    </html>
  );
}
