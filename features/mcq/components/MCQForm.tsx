"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mcqSchema = z.object({
  question: z.string().min(5, "প্রশ্ন অন্তত ৫ অক্ষরের হতে হবে"),
  optionA: z.string().min(1, "অপশন ক প্রয়োজন"),
  optionB: z.string().min(1, "অপশন খ প্রয়োজন"),
  optionC: z.string().min(1, "অপশন গ প্রয়োজন"),
  optionD: z.string().min(1, "অপশন ঘ প্রয়োজন"),
  correctOptionIndex: z.number().min(0).max(3),
  explanation: z.string().optional(),
  subject: z.string().min(1, "বিষয় প্রয়োজন"),
  chapter: z.string().min(1, "অধ্যায় প্রয়োজন"),
  topic: z.string().min(1, "টপিক প্রয়োজন"),
  difficulty: z.enum(["easy", "medium", "hard"]),
});

type MCQFormValues = z.infer<typeof mcqSchema>;

interface MCQFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitMock: (data: any) => void;
  initialData?: any;
}

export function MCQForm({ open, onOpenChange, onSubmitMock, initialData }: MCQFormProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<MCQFormValues>({
    resolver: zodResolver(mcqSchema),
    defaultValues: initialData || {
      correctOptionIndex: 0,
      difficulty: "medium",
    },
  });

  const onSubmit = (data: MCQFormValues) => {
    const formattedData = {
      ...data,
      options: [data.optionA, data.optionB, data.optionC, data.optionD],
    };
    onSubmitMock(formattedData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto w-full" style={{ fontFamily: "inherit" }}>
        <DialogHeader>
          <DialogTitle>{initialData ? "প্রশ্ন এডিট করুন" : "নতুন প্রশ্ন যোগ করুন"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>প্রশ্ন</Label>
            <Input {...register("question")} placeholder="বাংলাদেশের রাজধানী কোথায়..." />
            {errors.question && <p className="text-red-500 text-sm">{errors.question.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>অপশন ক</Label>
              <Input {...register("optionA")} />
            </div>
            <div className="space-y-2">
              <Label>অপশন খ</Label>
              <Input {...register("optionB")} />
            </div>
            <div className="space-y-2">
              <Label>অপশন গ</Label>
              <Input {...register("optionC")} />
            </div>
            <div className="space-y-2">
              <Label>অপশন ঘ</Label>
              <Input {...register("optionD")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>সঠিক উত্তর</Label>
              <Select onValueChange={(val) => setValue("correctOptionIndex", parseInt(val))}>
                <SelectTrigger>
                  <SelectValue placeholder="সঠিক উত্তর নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">অপশন ক</SelectItem>
                  <SelectItem value="1">অপশন খ</SelectItem>
                  <SelectItem value="2">অপশন গ</SelectItem>
                  <SelectItem value="3">অপশন ঘ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>কঠিনতা</Label>
              <Select onValueChange={(val) => setValue("difficulty", val as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="কঠিনতা নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">সহজ</SelectItem>
                  <SelectItem value="medium">মাঝারি</SelectItem>
                  <SelectItem value="hard">কঠিন</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>বিষয়</Label>
              <Input {...register("subject")} />
            </div>
            <div className="space-y-2">
              <Label>অধ্যায়</Label>
              <Input {...register("chapter")} />
            </div>
            <div className="space-y-2">
              <Label>টপিক</Label>
              <Input {...register("topic")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>ব্যাখ্যা (ঐচ্ছিক)</Label>
            <Input {...register("explanation")} />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              বাতিল
            </Button>
            <Button type="submit">সংরক্ষণ করুন</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
