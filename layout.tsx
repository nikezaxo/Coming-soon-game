import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Telegram Mini App',
  description: 'A simple Telegram Mini App using Next.js 14'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const initData = window.Telegram.WebApp.initDataUnsafe;
    if (initData?.user?.username) {
      setUsername(initData.user.username);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '10px', textAlign: 'center', zIndex: 1000 }}>
          {username}
        </div>
        <div style={{ marginTop: '50px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
