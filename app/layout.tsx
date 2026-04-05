import type { Metadata } from "next";
import {Roboto, Geist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const roboto = Roboto({weight:"400" , subsets:["latin"]})

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "A simple expense tracker app built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html
      lang="en"
      className={cn("h-full", "antialiased", roboto.className, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="container">
        {children}
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
