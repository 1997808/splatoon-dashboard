"use client";
import Loading from "@/app/loading";
import { Toaster } from "@/components/ui/toaster";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import React, { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
