"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Topic, Lesson, Subject } from "@/types";
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
  { id: "l1", subjectId: "s1", name: "কোষীয় গঠন" },
  { id: "l2", subjectId: "s1", name: "কোষ বিভাজন" },
];

const mockTopics: Topic[] = [
  { id: "t1", lessonId: "l1", name: "মাইটোকন্ড্রিয়া", description: "কোষের শক্তিঘর" },
  { id: "t2", lessonId: "l1", name: "নিউক্লিয়াস", description: "কোষের মস্তিষ্ক" },
];

export function TopicsFeature() {
  const [topics, setTopics] = useState<Topic[]>(mockTopics);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({ name: "", description: "", lessonId: "", subjectId: "" });

  const columns: ColumnDef<Topic>[] = [
    { accessorKey: "name", header: "টপিকের নাম" },
    { 
      accessorKey: "lessonId", 
      header: "পাঠ",
      cell: ({ row }) => {
        const lesson = mockLessons.find(l => l.id === row.original.lessonId);
        return lesson ? lesson.name : "অজানা পাঠ";
      }
    },
    { accessorKey: "description", header: "বর্ণনা" },
    {
      id: "actions",
      header: "অ্যাকশন",
      cell: () => <Button variant="ghost" size="sm">এডিট</Button>,
    },
  ];

  const handleAddTopic = () => {
    if (!newTopic.name || !newTopic.lessonId) return;
    const topic: Topic = {
      id: `t${topics.length + 1}`,
      ...newTopic,
    };
    setTopics([...topics, topic]);
    setNewTopic({ name: "", description: "", lessonId: "", subjectId: "" });
    setIsDialogOpen(false);
  };

  const filteredLessons = mockLessons.filter(l => l.subjectId === newTopic.subjectId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">টপিকসমূহ (Topics)</h2>
          <p className="text-gray-500 text-sm mt-1">সব টপিকের তালিকা এবং নতুন টপিক যোগ করুন।</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              নতুন টপিক যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>নতুন টপিক যোগ করুন</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">বিষয়</Label>
                <Select 
                  onValueChange={(value) => setNewTopic({ ...newTopic, subjectId: value, lessonId: "" })}
                  value={newTopic.subjectId}
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
                <Label htmlFor="lesson">পাঠ</Label>
                <Select 
                  onValueChange={(value) => setNewTopic({ ...newTopic, lessonId: value })}
                  value={newTopic.lessonId}
                  disabled={!newTopic.subjectId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="পাঠ নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredLessons.map(l => (
                      <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">টপিকের নাম</Label>
                <Input
                  id="name"
                  value={newTopic.name}
                  onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                  placeholder="উদা: মাইটোকন্ড্রিয়া"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">বর্ণনা</Label>
                <Input
                  id="description"
                  value={newTopic.description}
                  onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                  placeholder="টপিকের সংক্ষিপ্ত বর্ণনা"
                />
              </div>
            </div>
            <Button onClick={handleAddTopic} className="w-full" disabled={!newTopic.lessonId}>
              সংরক্ষণ করুন
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable 
        columns={columns} 
        data={topics} 
        searchKey="name" 
        searchPlaceholder="টপিকের নাম অনুসারে খুঁজুন..." 
      />
    </div>
  );
}
