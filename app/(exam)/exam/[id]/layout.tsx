"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
