import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PublicLayout } from "@/components/navigation/PublicLayout";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DiskiCentral — South African football, live.",
  description: "Matchday, football intelligence and stories from South African football.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${inter.variable} antialiased`}><body><PublicLayout>{children}</PublicLayout></body></html>;
}
