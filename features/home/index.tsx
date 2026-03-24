"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export function HomeFeature() {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      if (user?.role === "super_admin") {
        router.push("/super-admin/dashboard");
      } else if (user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/student");
      }
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
