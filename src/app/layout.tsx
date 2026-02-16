import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

const outfit = Outfit({
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={outfit.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          {children} <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
