import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppBarClient } from "../components/AppBarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EzyPay",
  description: "A simple payments app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="min-w-screen h-[100vh] bg-[#ebe6e6] overflow-y-auto overflow-x-hidden">
            <AppBarClient/>
           {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
