import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DeshiDwell - Find Your Perfect Stay",
  description: "Temporary housing and accommodation booking platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="light">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary-50`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
