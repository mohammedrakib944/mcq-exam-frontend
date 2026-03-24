"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Lesson, Subject } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const mockSubjects: Subject[] = [
  { id: "s1", name: "জীববিজ্ঞান" },
  { id: "s2", name: "উচ্চতর গণিত" },
];

const mockLessons: Lesson[] = [
  { id: "l1", subjectId: "s1", name: "কোষীয় গঠন", description: "কোষের বিভিন্ন অঙ্গাণু" },
  { id: "l2", subjectId: "s1", name: "কোষ বিভাজন", description: "মাইটোসিস ও মিয়োসিস" },
  { id: "l3", subjectId: "s2", name: "ত্রিকোণমিতি", description: "ত্রিকোণমিতিক অনুপাত" },
];

export function LessonsFeature() {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLesson, setNewLesson] = useState({ name: "", description: "", subjectId: "" });

  const columns: ColumnDef<Lesson>[] = [
    { accessorKey: "name", header: "পাঠের নাম" },
    { 
      accessorKey: "subjectId", 
      header: "বিষয়",
      cell: ({ row }) => {
        const subject = mockSubjects.find(s => s.id === row.original.subjectId);
        return subject ? subject.name : "অজানা বিষয়";
      }
    },
    { accessorKey: "description", header: "বর্ণনা" },
    {
      id: "actions",
      header: "অ্যাকশন",
      cell: () => <Button variant="ghost" size="sm">এডিট</Button>,
    },
  ];

  const handleAddLesson = () => {
    if (!newLesson.name || !newLesson.subjectId) return;
    const lesson: Lesson = {
      id: `l${lessons.length + 1}`,
      ...newLesson,
    };
    setLessons([...lessons, lesson]);
    setNewLesson({ name: "", description: "", subjectId: "" });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">পাঠসমূহ (Lessons)</h2>
          <p className="text-gray-500 text-sm mt-1">সব পাঠের তালিকা এবং নতুন পাঠ যোগ করুন।</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              নতুন পাঠ যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>নতুন পাঠ যোগ করুন</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">বিষয়</Label>
                <Select 
                  onValueChange={(value) => setNewLesson({ ...newLesson, subjectId: value })}
                  value={newLesson.subjectId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSubjects.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">পাঠের নাম</Label>
                <Input
                  id="name"
                  value={newLesson.name}
                  onChange={(e) => setNewLesson({ ...newLesson, name: e.target.value })}
                  placeholder="উদা: কোষীয় গঠন"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">বর্ণনা</Label>
                <Input
                  id="description"
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                  placeholder="পাঠের সংক্ষিপ্ত বর্ণনা"
                />
              </div>
            </div>
            <Button onClick={handleAddLesson} className="w-full">
              সংরক্ষণ করুন
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable 
        columns={columns} 
        data={lessons} 
        searchKey="name" 
        searchPlaceholder="পাঠের নাম অনুসারে খুঁজুন..." 
      />
    </div>
  );
}
