"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Play, Copy, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

interface ExamRow {
  id: string;
  title: string;
  durationMinutes: number;
  questionsCount: number;
  createdAt: string;
}

export function ExamsListFeature() {
  const router = useRouter();
  const [data, setData] = useState<ExamRow[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("mockExams");
    if (raw) {
      setData(JSON.parse(raw));
    }
  }, []);

  const handleCopyLink = (examId: string) => {
    const link = `${window.location.origin}/exam/${examId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(examId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const columns: ColumnDef<ExamRow>[] = [
    { accessorKey: "title", header: "পরীক্ষার নাম" },
    { accessorKey: "questionsCount", header: "সর্বমোট প্রশ্ন" },
    { 
      accessorKey: "durationMinutes", 
      header: "সময়",
      cell: ({ row }) => `${row.original.durationMinutes} মিনিট`
    },
    { 
      accessorKey: "createdAt", 
      header: "তৈরির তারিখ",
      cell: ({ row }) => format(new Date(row.original.createdAt), "PP", { locale: enUS })
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const isCopied = copiedId === row.original.id;
        return (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleCopyLink(row.original.id)}
              className={isCopied ? "text-green-600 border-green-200 bg-green-50" : ""}
            >
              {isCopied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {isCopied ? "কপি করা হয়েছে" : "লিঙ্ক কপি করুন"}
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => router.push(`/exam/${row.original.id}`)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Play className="w-4 h-4 mr-2" /> পরীক্ষা দিন
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">পরীক্ষাসমূহ পরিচালনা করুন</h2>
        <Button onClick={() => router.push("/admin/question-bank")}>
          নতুন পরীক্ষা তৈরি করুন
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={data} 
        searchKey="title" 
        searchPlaceholder="পরীক্ষা খুঁজুন..." 
      />
    </div>
  );
}
