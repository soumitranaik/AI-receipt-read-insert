import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";


const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Page Rewiewer",
  description: "Review your webpage design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
