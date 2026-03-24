"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role !== "super_admin") {
      router.push("/"); // redirect unauthorized
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== "super_admin") return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar user={user} />
      <div className="flex flex-1">
        <Sidebar role="super_admin" />
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
