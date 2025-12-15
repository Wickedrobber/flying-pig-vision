import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "When pigs fly",
  description: "Market slang for the impossible",
  openGraph: {
    title: "When pigs fly",
    description: "Market slang for the impossible",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "When pigs fly",
    description: "Market slang for the impossible"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scrollbar-none">
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
