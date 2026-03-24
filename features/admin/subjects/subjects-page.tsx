"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Subject } from "@/types";
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

const mockSubjects: Subject[] = [
  { id: "s1", name: "জীববিজ্ঞান", description: "জীববিজ্ঞান বিষয়ক সকল অধ্যায়" },
  { id: "s2", name: "উচ্চতর গণিত", description: "উচ্চতর গণিত বিষয়ক সকল অধ্যায়" },
  { id: "s3", name: "পদার্থবিজ্ঞান", description: "পদার্থবিজ্ঞান বিষয়ক সকল অধ্যায়" },
];

export function SubjectsFeature() {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", description: "" });

  const columns: ColumnDef<Subject>[] = [
    { accessorKey: "name", header: "বিষয়ের নাম" },
    { accessorKey: "description", header: "বর্ণনা" },
    {
      id: "actions",
      header: "অ্যাকশন",
      cell: () => (
        <Button variant="ghost" size="sm">
          এডিট
        </Button>
      ),
    },
  ];

  const handleAddSubject = () => {
    if (!newSubject.name) return;
    const subject: Subject = {
      id: `s${subjects.length + 1}`,
      ...newSubject,
    };
    setSubjects([...subjects, subject]);
    setNewSubject({ name: "", description: "" });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">বিষয়সমূহ (Subjects)</h2>
          <p className="text-gray-500 text-sm mt-1">সব বিষয়ের তালিকা এবং নতুন বিষয় যোগ করুন।</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              নতুন বিষয় যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>নতুন বিষয় যোগ করুন</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">বিষয়ের নাম</Label>
                <Input
                  id="name"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  placeholder="উদা: জীববিজ্ঞান"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">বর্ণনা</Label>
                <Input
                  id="description"
                  value={newSubject.description}
                  onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                  placeholder="বিষয়ের সংক্ষিপ্ত বর্ণনা"
                />
              </div>
            </div>
            <Button onClick={handleAddSubject} className="w-full">
              সংরক্ষণ করুন
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable 
        columns={columns} 
        data={subjects} 
        searchKey="name" 
        searchPlaceholder="বিষয়ের নাম অনুসারে খুঁজুন..." 
      />
    </div>
  );
}
