import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Art hub',
  description: '그림 거래의 중심 Art hub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
