import { Bell, UserCircle } from "lucide-react";

export function Topbar({ user }: { user?: { name: string; role: string } }) {
  const getRoleLabel = (role?: string) => {
    switch(role) {
      case "super_admin": return "সুপার এডমিন";
      case "admin": return "এডমিন (শিক্ষক)";
      case "student": return "ছাত্র/ছাত্রী";
      default: return "কোনো রোল নেই";
    }
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-800">এমসিকিউ প্ল্যাটফর্ম</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2 border-l pl-4 ml-2">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-gray-700">{user?.name || "গেস্ট"}</div>
            <div className="text-xs text-gray-500 capitalize">{getRoleLabel(user?.role)}</div>
          </div>
          <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
            <UserCircle size={32} />
          </button>
        </div>
      </div>
    </header>
  );
}
