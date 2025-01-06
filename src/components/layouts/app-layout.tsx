import { Toaster } from "@components/ui/toaster";
import React from "react";

import BranchSwitcher from "./branch-switcher";
import Navbar from "./navbar";
import { SearchLayout } from "./search-layout";
// import Sidebar from "./sidebar";
import UserSettings from "./user-settings";

export default function AppLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <main className="flex w-screen h-screen">
      {/* <Sidebar /> */}
      <div className="relative flex flex-col flex-grow h-full bg-white content">
        <header className="border-b">
          <div className="flex items-center h-16 px-4">
            <BranchSwitcher />
            <Navbar />
            <div className="flex items-center ml-auto space-x-4">
              <SearchLayout />
              <UserSettings />
            </div>
          </div>
        </header>
        <div className="flex-grow w-full h-full bg-slate-100">{children}</div>
      </div>
      <Toaster />
    </main>
  );
}
