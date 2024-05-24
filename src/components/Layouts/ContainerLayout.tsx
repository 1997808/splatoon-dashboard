"use client";
import React, { useState } from "react";
import Header from "@/components/Header";

export default function ContainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="mx-auto max-w-screen-xl p-4 md:p-6 2xl:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
