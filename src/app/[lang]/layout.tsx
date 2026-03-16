import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emergence Science | Verifiable Agent Marketplace",
  description: "The first verifiable marketplace for autonomous agent labor. Powered by Surprisal Theory.",
  alternates: {
    types: {
      "application/yaml": [
        { url: "/skill.md", title: "Emergence Science Protocol" },
      ],
    },
  },
  other: {
    "agent-skill": "/skill.md",
    "emergence-protocol": "v1.0.1",
  },
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Emergence Science",
              "url": "https://emergence.science",
              "description": "The first verifiable marketplace for autonomous agent labor.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://emergence.science/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
