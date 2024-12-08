import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { baseUrl } from "./sitemap";
import Footer from "@/components/footer";

const regularFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-regular",
  display: "swap",
  weight: "400",
});

const codeFont = Space_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "PL Project",
  description: "página feita para auxiliar financeiramente um salão de beleza",
  metadataBase: new URL(baseUrl as string),
  openGraph: {
    title: "Meu portifólio",
    description: "Conheça meus projetos.",
    url: baseUrl,
    siteName: "Por",
    locale: "pt_br",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${regularFont.variable} ${codeFont.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex flex-col items-center sm:container mx-auto w-[88vw]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
