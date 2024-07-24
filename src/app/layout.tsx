import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Provider from './provider';

const naverNeoFonts = localFont({
  src: '../fonts/NanumSquareNeo-Variable.ttf',
  display: 'swap',
  variable: '--font-neo',
});

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
    <html lang='en' className={naverNeoFonts.variable}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
