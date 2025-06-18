// src/app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hossam Abdelaziz | Frontend Developer Portfolio',
  description:
    'Official portfolio of Hossam Abdelaziz. Frontend developer specializing in React, Next.js, TypeScript, and modern web UI.',
  metadataBase: new URL('https://www.hossamabdelaziz.com'),
  openGraph: {
    title: 'Hossam Abdelaziz | Frontend Developer Portfolio',
    description:
      'Showcasing modern web projects using React, Next.js, TypeScript, Firebase, and more.',
    url: 'https://www.hossamabdelaziz.com',
    siteName: 'Hossam Abdelaziz Portfolio',
    images: [
      {
        url: '/og.png', // Optional: Add this to public folder
        width: 1200,
        height: 630,
        alt: 'Hossam Abdelaziz Portfolio Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hossam Abdelaziz | Frontend Developer Portfolio',
    description:
      'Frontend developer building interactive websites using React and Next.js.',
    images: ['/og.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
