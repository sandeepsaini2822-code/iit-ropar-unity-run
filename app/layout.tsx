import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IIT Ropar Unity Run 2026',
  description: 'IIT Ropar Unity Run 2026 — a campus-wide celebration of movement and community.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
