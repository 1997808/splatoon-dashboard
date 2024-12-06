"use client";
import { Toaster } from "@/components/ui/toaster";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import NextTopLoader from 'nextjs-toploader';
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >
        <NextTopLoader />
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
