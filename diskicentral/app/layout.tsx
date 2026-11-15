import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PublicLayout } from "@/components/navigation/PublicLayout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diski Central",
  description: "Latest South African football news.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
