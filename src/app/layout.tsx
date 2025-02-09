import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { baseUrl } from "./sitemap";
import Footer from "@/components/footer";
import CookieConsent from "@/components/cookie-consent";

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
    title: "PL Project",
    description:
      "ágina feita para auxiliar financeiramente um salão de beleza.",
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
export const NAVLINKS = [
  { title: "Início", href: "/" },
  {
    title: "Cálculo de Lucratividade",
    href: `/profit`,
  },

  { title: "Salão", href: "/salon" },
  {
    title: "Conta",
    href: "/account",
  },
];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${regularFont.variable} ${codeFont.variable} antialiased flex flex-col min-h-screen max-w-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar navLinks={NAVLINKS} />
          <main className="flex flex-col items-center sm:container mx-auto w-[88vw] max-w-screen flex-grow">
            {children}
          </main>
          <CookieConsent />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
