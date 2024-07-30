import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | MetaBank360",
    default: "MetaBank360",
  },
  description: "360도 회전 촬영",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}
      text-white max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
