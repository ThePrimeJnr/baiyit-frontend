import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { BagProvider } from "@/contexts/bag-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Baiyit | AI Shopping Concierge",
  description:
    "The world's first AI-first shopping concierge that finds, compares, and purchases products for you.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${robotoMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <BagProvider>
            {children}
            <Toaster />
          </BagProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
