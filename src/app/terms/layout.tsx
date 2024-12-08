"use client";

import { MDXProvider } from "@mdx-js/react";

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MDXProvider>{children}</MDXProvider>;
}
