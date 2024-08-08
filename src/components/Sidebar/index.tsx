"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRightFromLine, ArrowRightLeft, Crosshair, LayoutGrid, LogOut, ReceiptJapaneseYen, Settings, Wallet } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-40 flex h-screen w-72 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-6 lg:py-6">
        <div className="flex items-center justify-center flex-grow">
          <Link className="gap-2 font-bold text-white text-2xl" href="/">
            PineStats
          </Link>
        </div>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <ArrowLeft size={20} />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear grow">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 pb-4 lg:px-6 min-h-full flex flex-col justify-between">
          {/* <!-- Menu Group --> */}
          <ul className="mb-6 flex flex-col gap-1.5">
            <li>
              <Link
                href="/"
                className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/" ||
                  pathname.includes("dashboard")) &&
                  "bg-graydark dark:bg-meta-4"
                  }`}
              >
                <LayoutGrid size={20} />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/balances"
                className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("balances") && "bg-graydark dark:bg-meta-4"
                  }`}
              >
                <Wallet size={20} />
                Balances
              </Link>
            </li>

            <li>
              <Link
                href="/transactions"
                className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("transactions") && "bg-graydark dark:bg-meta-4"
                  }`}
              >
                <ArrowRightLeft size={20} />
                Transactions
              </Link>
            </li>

            <li>
              <Link
                href="/bills"
                className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("bills") && "bg-graydark dark:bg-meta-4"
                  }`}
              >
                <ReceiptJapaneseYen size={20} />
                Bills
              </Link>
            </li>

            <li>
              <Link
                href="/expenses"
                className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("expenses") && "bg-graydark dark:bg-meta-4"
                  }`}
              >
                <ArrowRightFromLine size={20} />
                Expenses
              </Link>
            </li>

            <li>
              <Link
                href="/goal"
                className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("goal") && "bg-graydark dark:bg-meta-4"
                  }`}
              >
                <Crosshair size={20} />
                Goal
              </Link>
            </li>

            {/* <!-- Menu Item Settings --> */}
            <li>
              <Link
                href="/settings"
                className={`group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("settings") &&
                  "bg-graydark dark:bg-meta-4"
                  }`}
              >
                <Settings size={20} />
                Settings
              </Link>
            </li>
            {/* <!-- Menu Item Settings --> */}
          </ul>

          <div>
            <hr className="h-px m-4 bg-neutral-500 border-0" />
            <div className="flex justify-between items-center px-4 py-2 gap-3">
              <Link href="/settings">
                <div className="group relative flex items-center px-2 py-1 gap-3 rounded-lg font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 grow">
                  <Image
                    src={"/images/user/user-06.png"}
                    width={28}
                    height={28}
                    style={{
                      width: "auto",
                      height: "auto",
                    }}
                    alt="profile"
                  />
                  <div className="flex flex-col grow">
                    <span className="text-white font-bold">John Doe</span>
                    <span className="text-neutral-400 text-xs">View profile</span>
                  </div>
                </div>
              </Link>
              <div className="rounded-lg p-2 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                <Link href="/auth/signin">
                  <LogOut size={16} className="text-white" />
                </Link>
              </div>
            </div>
          </div>

        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
