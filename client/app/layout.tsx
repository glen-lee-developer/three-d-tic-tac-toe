import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Three-D tic tac toe",
  description: "An online multiplayer 3D tic tac toe game in 3D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen w-screen flex flex-col justify-between`}
      >
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
