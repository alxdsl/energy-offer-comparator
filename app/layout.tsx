import { Geist } from 'next/font/google'

import type { Metadata } from 'next';

const geist = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Energy Offer Comparator',
  description: 'Compare energy offers from various providers to find the best deal for you.',
};

import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>
        {children}
      </body>
    </html>
  )
}
