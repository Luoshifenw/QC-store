import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/lib/CartContext';
import { LoadingBar } from '@/components/Loading';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wearlivra.com'),
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
    <html lang="en">
      <body className="pt-16">
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
