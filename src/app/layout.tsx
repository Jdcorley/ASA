import type { Metadata, Viewport } from "next";
import { Figtree, Syne } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lumen — Learn by playing with ideas",
    template: "%s · Lumen",
  },
  description:
    "Creative learning modules and mini-games that teach through interaction — built for mobile, directed from your phone with Cursor.",
  applicationName: "Lumen",
  appleWebApp: {
    capable: true,
    title: "Lumen",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#e8eef5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <div className="pb-24">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
