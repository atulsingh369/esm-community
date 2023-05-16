import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ESM",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html id="main-html" lang="en" data-theme="forest">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
