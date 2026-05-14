import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Eyad Hani — AI Architect & Full-Stack Engineer',
  description: 'Portfolio v2.5 — Engineering elegance through computational complexity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
