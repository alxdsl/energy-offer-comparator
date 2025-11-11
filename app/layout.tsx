import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Energy Offer Comparator',
  description: 'Compare energy offers from various providers to find the best deal for you.',
};
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
