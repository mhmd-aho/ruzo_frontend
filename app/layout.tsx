import type { Metadata } from "next";
import { Boldonse,Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
const boldonse = Boldonse({
  variable: "--next-font-boldonse",
  weight: '400',
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--next-font-montserrat",
  weight: ["400","500","600","700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ruzo",
  description: "Discover the best collections at Ruzo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${boldonse.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-screen w-full flex flex-col">
        <Toaster position="top-center"/>
        {children}
      </body>
    </html>
  );
}
