"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { MCQ } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const mockData: MCQ[] = [
  {
    id: "m1",
    question: "কোষের পাওয়ার হাউস কোনটি?",
    options: ["নিউক্লিয়াস", "মাইটোকন্ড্রিয়া", "রাইবোজোম", "এন্ডোপ্লাজমিক রেটিকুলাম"],
    correctOptionIndex: 1,
    subjectId: "s1",
    lessonId: "l1",
    topicId: "t1",
    difficulty: "easy",
  },
  {
    id: "m2",
    question: "নিচের কোনটি একটি সর্টিং অ্যালগরিদম?",
    options: ["বাইনারি সার্চ", "ডিএফএস (DFS)", "মার্জ সর্ট", "ডাইকস্ট্রা"],
    correctOptionIndex: 2,
    subjectId: "s2",
    lessonId: "l2",
    topicId: "t2",
    difficulty: "medium",
  },
];

export function QuestionBankFeature() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const data = mockData;

  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    }
  };

  const columns: ColumnDef<MCQ>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            if (value) {
              setSelectedIds(data.map((d) => d.id));
            } else {
              setSelectedIds([]);
            }
          }}
          aria-label="সব নির্বাচন করুন"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedIds.includes(row.original.id)}
          onCheckedChange={(value) => handleSelect(row.original.id, !!value)}
          aria-label="সারি নির্বাচন করুন"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    { accessorKey: "question", header: "প্রশ্ন" },
    { accessorKey: "subjectId", header: "বিষয়" },
    { 
      accessorKey: "difficulty", 
      header: "কঠিনতা",
      cell: ({ row }) => {
        const diff = row.original.difficulty;
        return diff === "easy" ? "সহজ" : diff === "medium" ? "মাঝারি" : "কঠিন";
      }
    },
  ];

  const handleCreateExam = () => {
    if (selectedIds.length === 0) return;
    localStorage.setItem("selectedMcqs", JSON.stringify(selectedIds));
    router.push("/admin/create-exam");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">প্রশ্ন ব্যাংক</h2>
          <p className="text-gray-500 text-sm mt-1">পরীক্ষায় যোগ করতে প্রশ্ন নির্বাচন করুন।</p>
        </div>
        <Button onClick={handleCreateExam} disabled={selectedIds.length === 0}>
          পরীক্ষা তৈরি করুন ({selectedIds.length})
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="question" 
        searchPlaceholder="প্রশ্ন অনুসারে খুঁজুন..." 
      />
    </div>
  );
}
