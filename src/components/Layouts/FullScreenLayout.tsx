"use client";
import React from "react";

export default function FullScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden">
      {/* <!-- ===== Main Content Start ===== --> */}
      <div className="w-full mx-auto max-w-screen-xl h-screen">
        {children}
      </div>
      {/* <!-- ===== Main Content End ===== --> */}
    </div>
  );
}
