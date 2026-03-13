import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "דשבורד ממומן | אצבע על הדופק",
  description:
    "דשבורד מעקב Meta Ads + משפך המרות + רווחיות — למילוי ע״י סוכן AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
