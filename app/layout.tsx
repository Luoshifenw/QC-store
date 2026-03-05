import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/lib/CartContext';
import { LoadingBar } from '@/components/Loading';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'LIVRA | Elegant Lingerie',
  description: 'Premium lingerie for the modern woman. Comfort meets sophistication.',
  icons: {
    icon: '/images/logo_favicon.png',
    apple: '/images/logo_favicon.png',
  },
  openGraph: {
    title: 'LIVRA | Elegant Lingerie',
    description: 'Premium lingerie for the modern woman. Comfort meets sophistication.',
    images: ['/images/hero_banner.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} pt-16`}>
        <CartProvider>
          <LoadingBar />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
