import type { Metadata } from "next";
import { Anek_Bangla } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const anekBangla = Anek_Bangla({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "এমসিকিউ প্ল্যাটফর্ম",
  description: "Next.js দিয়ে তৈরি আধুনিক এমসিকিউ ম্যানেজমেন্ট সিস্টেম",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${anekBangla.className} min-h-screen flex flex-col antialiased bg-gray-50`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
