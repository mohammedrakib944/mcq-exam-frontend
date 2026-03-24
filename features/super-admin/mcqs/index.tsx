"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { MCQ } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { MCQForm } from "@/features/mcq/components/MCQForm";

// Mock Data
const mockData: MCQ[] = [
  {
    id: "m1",
    question: "কোষের পাওয়ার হাউস কোনটি?",
    options: ["নিউক্লিয়াস", "মাইটোকন্ড্রিয়া", "রাইবোজোম", "এন্ডোপ্লাজমিক রেটিকুলাম"],
    correctOptionIndex: 1,
    subject: "জীববিজ্ঞান",
    chapter: "কোষীয় গঠন",
    topic: "অঙ্গাণু",
    difficulty: "easy",
  },
  {
    id: "m2",
    question: "নিচের কোনটি একটি সর্টিং অ্যালগরিদম?",
    options: ["বাইনারি সার্চ", "ডিএফএস (DFS)", "মার্জ সর্ট", "ডাইকস্ট্রা"],
    correctOptionIndex: 2,
    subject: "কম্পিউটার বিজ্ঞান",
    chapter: "অ্যালগরিদম",
    topic: "সর্টিং",
    difficulty: "medium",
  },
];

export function SuperAdminMCQsFeature() {
  const [data, setData] = useState<MCQ[]>(mockData);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const columns: ColumnDef<MCQ>[] = [
    { accessorKey: "question", header: "প্রশ্ন" },
    { accessorKey: "subject", header: "বিষয়" },
    { accessorKey: "chapter", header: "অধ্যায়" },
    { accessorKey: "topic", header: "টপিক" },
    { 
      accessorKey: "difficulty", 
      header: "কঠিনতা",
      cell: ({ row }) => {
        const diff = row.original.difficulty;
        return diff === "easy" ? "সজহ" : diff === "medium" ? "মাঝারি" : "কঠিন";
      }
    },
    {
      id: "actions",
      cell: () => <Button variant="ghost" size="sm">এডিট</Button>,
    },
  ];

  const handleAddSubmit = (newMcq: any) => {
    setData([{ ...newMcq, id: Math.random().toString() }, ...data]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">এমসিকিউ ম্যানেজমেন্ট</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            বাল্ক আপলোড
          </Button>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            প্রশ্ন যোগ করুন
          </Button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="question" 
        searchPlaceholder="প্রশ্ন খুঁজুন..." 
      />

      <MCQForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSubmitMock={handleAddSubmit} 
      />
    </div>
  );
}
