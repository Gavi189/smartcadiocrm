"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Header from "./header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLayoutPage = [
    "/dashboard",
    "/patients",
    "/patient-register",
    "/medical-record",
    "/risk-calculator",
  ].includes(pathname);

  return isLayoutPage ? (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col">{children}</div>
  );
}
