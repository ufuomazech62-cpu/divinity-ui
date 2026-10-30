import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./showcase.css";

export const metadata: Metadata = {
  title: "Divinity Companion — UI/UX Showcase",
  description:
    "Frontend-only showcase of the Divinity Companion dashboard: every page, element and flow of the world app — chats, world, discover, contacts, profile — with static demo data. No landing, no sign-in, no backend.",
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#7c5bd9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
