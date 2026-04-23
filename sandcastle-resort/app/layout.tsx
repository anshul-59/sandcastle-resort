import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sandcastle Beach Resort | Dapoli, Maharashtra",
  description: "A peaceful coastal escape nestled on the shores of Dapoli. Experience luxury, serenity, and the timeless beauty of the Konkan coast.",
  keywords: "beach resort, Dapoli, Maharashtra, coastal retreat, luxury resort, Konkan coast",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}