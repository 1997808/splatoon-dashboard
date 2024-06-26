"use client";
import React from "react";

export default function BlankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden">
      {/* <!-- ===== Main Content Start ===== --> */}
      <div className="w-full mx-auto max-w-screen-xl p-4 md:p-6 2xl:p-10">
        {children}
      </div>
      {/* <!-- ===== Main Content End ===== --> */}
    </div>
  );
}
