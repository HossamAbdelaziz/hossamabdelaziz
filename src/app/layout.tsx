import type { Metadata } from 'next';
import '@fontsource-variable/source-serif-4';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import GTag from '@/components/GTag';

const title = 'Hossam Abdelaziz — Software Developer';
const description =
    'Software developer and computer science student at Sheridan College. Three live products: a bilingual coaching platform on web, iOS and Android, a field-service platform used daily in two countries, and a vehicle rental system. Open to a Summer 2027 internship or co-op.';

export const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL('https://www.hossamabdelaziz.com'),
    alternates: { canonical: '/' },
    openGraph: {
        title,
        description,
        url: 'https://www.hossamabdelaziz.com',
        siteName: 'Hossam Abdelaziz',
        type: 'website',
        images: [
            {
                url: '/og.png',
                width: 1200,
                height: 630,
                alt: 'Hossam Abdelaziz — software developer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/og.png'],
    },
    icons: {
        icon: [
            { url: '/icon.svg', type: 'image/svg+xml' },
            { url: '/favicon.ico', sizes: '48x48' },
        ],
        apple: '/apple-icon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
                <GTag />
                <Analytics />
            </body>
        </html>
    );
}
