"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, PlusCircle } from "lucide-react";

export function CreateExamFeature() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(30);

  useEffect(() => {
    const stored = localStorage.getItem("selectedMcqs");
    if (stored) {
      setSelectedIds(JSON.parse(stored));
    } else {
      router.push("/admin/question-bank");
    }
  }, [router]);

  const handlePublish = () => {
    const examId = "exam-" + Math.random().toString(36).substring(7);
    const mockExam = {
      id: examId,
      title,
      durationMinutes,
      questionsCount: selectedIds.length,
      createdAt: new Date().toISOString(),
    };
    
    const existing = JSON.parse(localStorage.getItem("mockExams") || "[]");
    localStorage.setItem("mockExams", JSON.stringify([mockExam, ...existing]));
    
    localStorage.removeItem("selectedMcqs");
    router.push("/admin/exams");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">পরীক্ষা তৈরি করুন</h2>
          <p className="text-gray-500 text-sm mt-1">নিচে আপনার ডেমো পরীক্ষার কনফিগারেশন সেট করুন।</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>পরীক্ষার বিস্তারিত</CardTitle>
          <CardDescription>আপনি ব্যাংক থেকে {selectedIds.length} টি প্রশ্ন নির্বাচন করেছেন।</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">পরীক্ষার নাম</Label>
            <Input 
              id="title" 
              placeholder="যেমন: মিডটার্ম বায়োলজি পরীক্ষা" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">সময় (মিনিট)</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="duration" 
                type="number" 
                min={5}
                className="pl-9"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 30)}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => router.back()}>বাতিল</Button>
            <Button onClick={handlePublish} disabled={!title.trim() || durationMinutes < 1}>
              <PlusCircle className="mr-2 h-4 w-4" />
              পরীক্ষা প্রকাশ করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
