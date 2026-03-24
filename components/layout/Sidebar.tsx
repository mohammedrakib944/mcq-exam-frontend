import Link from "next/link";
import { LayoutDashboard, Users, FileText, CheckSquare, Settings } from "lucide-react";

export function Sidebar({ role }: { role: "super_admin" | "admin" | "student" }) {
  const links = [
    ...(role === "super_admin"
      ? [
          { href: "/super-admin/dashboard", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
          { href: "/super-admin/mcqs", label: "এমসিকিউ ম্যানেজমেন্ট", icon: FileText },
          { href: "/super-admin/users", label: "ইউজার্স", icon: Users },
        ]
      : []),
    ...(role === "admin"
      ? [
          { href: "/admin/dashboard", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
          { href: "/admin/subjects", label: "বিষয়সমূহ", icon: CheckSquare },
          { href: "/admin/lessons", label: "পাঠসমূহ", icon: CheckSquare },
          { href: "/admin/topics", label: "টপিকসমূহ", icon: CheckSquare },
          { href: "/admin/question-bank", label: "প্রশ্ন ব্যাংক", icon: FileText },
          { href: "/admin/exams", label: "পরীক্ষাসমূহ", icon: CheckSquare },
        ]
      : []),
    { href: "/settings", label: "সেটিংস", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r min-h-[calc(100vh-64px)] hidden md:block">
      <nav className="p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
