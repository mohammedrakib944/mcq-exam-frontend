"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockUsers: User[] = [
  { id: "u1", name: "করিম রহমান", email: "karim@example.com", role: "admin" },
  { id: "u2", name: "রহিমা আক্তার", email: "rahima@example.com", role: "student" },
  { id: "u3", name: "সাকিব হাসান", email: "sakib@example.com", role: "student" },
];

export function SuperAdminUsersFeature() {
  const [data] = useState<User[]>(mockUsers);

  const columns: ColumnDef<User>[] = [
    { accessorKey: "name", header: "নাম" },
    { accessorKey: "email", header: "ইমেইল" },
    { 
      accessorKey: "role", 
      header: "রোল",
      cell: ({ row }) => {
        const role = row.original.role;
        return role === "super_admin" ? "সুপার এডমিন" : role === "admin" ? "এডমিন (শিক্ষক)" : "ছাত্র/ছাত্রী";
      }
    },
    {
      id: "actions",
      cell: () => <Button variant="ghost" size="sm">এডিট</Button>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">ইউজার্স ম্যানেজমেন্ট</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          নতুন ইউজার যোগ করুন
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="name" 
        searchPlaceholder="নাম দিয়ে খুঁজুন..." 
      />
    </div>
  );
}
