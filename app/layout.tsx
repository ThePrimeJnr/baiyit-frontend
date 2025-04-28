import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { BagProvider } from '@/contexts/bag-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Baiyit | AI Shopping Concierge',
  description: 'The world\'s first AI-first shopping concierge that finds, compares, and purchases products for you.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <BagProvider>
            {children}
            <Toaster />
          </BagProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}