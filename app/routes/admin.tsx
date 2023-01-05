import { Outlet } from "@remix-run/react";
import React from "react";
import Sidebar from "~/components/Sidebar";

export default function AdminPage() {
  return (
    <>
      {/* Sidebar */}
      <Sidebar />
      <main className="ml-72 p-4">
        <Outlet />
      </main>
    </>
  );
}
