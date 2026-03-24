"use client";

import { useState, useReducer } from "react";
import { useRouter, useParams } from "next/navigation";
import { MCQ } from "@/types";
import { QuestionCard } from "@/components/QuestionCard";
import { Timer } from "@/components/Timer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const examMockQuestions: MCQ[] = [
  {
    id: "m1",
    question: "কোষের পাওয়ার হাউস কোনটি?",
    options: ["নিউক্লিয়াস", "মাইটোকন্ড্রিয়া", "রাইবোজোম", "এন্ডোপ্লাজমিক রেটিকুলাম"],
    correctOptionIndex: 1,
    subject: "Biology",
    chapter: "Cell",
    topic: "Organelles",
    difficulty: "easy",
  },
  {
    id: "m2",
    question: "নিচের কোনটি একটি সর্টিং অ্যালগরিদম?",
    options: ["বাইনারি সার্চ", "ডিএফএস (DFS)", "মার্জ সর্ট", "ডাইকস্ট্রা"],
    correctOptionIndex: 2,
    subject: "CS",
    chapter: "Algo",
    topic: "Sorting",
    difficulty: "medium",
  },
  {
    id: "m3",
    question: "২ + ২ কত হয়?",
    options: ["৩", "৪", "৫", "৬"],
    correctOptionIndex: 1,
    subject: "Math",
    chapter: "Basic",
    topic: "Addition",
    difficulty: "easy",
  },
];

type State = {
  answers: Record<string, number>;
  currentIndex: number;
};

type Action = 
  | { type: "SET_ANSWER"; payload: { questionId: string; optionIndex: number } }
  | { type: "GOTO"; payload: number }
  | { type: "NEXT" }
  | { type: "PREV" };

function examReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_ANSWER":
      return { ...state, answers: { ...state.answers, [action.payload.questionId]: action.payload.optionIndex } };
    case "GOTO":
      return { ...state, currentIndex: action.payload };
    case "NEXT":
      return { ...state, currentIndex: Math.min(state.currentIndex + 1, examMockQuestions.length - 1) };
    case "PREV":
      return { ...state, currentIndex: Math.max(state.currentIndex - 1, 0) };
    default:
      return state;
  }
}

export function TakeExamFeature() {
  const router = useRouter();
  const params = useParams();
  const examId = params.id as string;
  
  const [state, dispatch] = useReducer(examReducer, { answers: {}, currentIndex: 0 });
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  const currentQuestion = examMockQuestions[state.currentIndex];
  const isLastQuestion = state.currentIndex === examMockQuestions.length - 1;

  const handleSubmit = () => {
    localStorage.setItem(`exam_result_${examId}`, JSON.stringify(state.answers));
    router.push(`/exam/${examId}/result`);
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  if (!examStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">পরীক্ষার নির্দেশনাবলী</h1>
          <p className="text-gray-600">আপনার {examMockQuestions.length} টি প্রশ্ন সম্পন্ন করার জন্য ৩০ মিনিট সময় আছে।</p>
          <Button onClick={() => setExamStarted(true)} size="lg">পরীক্ষা শুরু করুন</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm">
        <h1 className="font-semibold text-lg">মক পরীক্ষা - {examId}</h1>
        <Timer durationMinutes={30} onTimeUp={handleTimeUp} />
        <Button variant="destructive" onClick={() => setSubmitDialogOpen(true)}>
          পরীক্ষা শেষ করুন
        </Button>
      </header>

      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6 md:order-2">
          <QuestionCard
            question={currentQuestion}
            questionNumber={state.currentIndex + 1}
            selectedOptionIndex={state.answers[currentQuestion.id]}
            onSelectOption={(idx) => dispatch({ type: "SET_ANSWER", payload: { questionId: currentQuestion.id, optionIndex: idx } })}
          />

          <div className="flex items-center justify-between mt-8 max-w-3xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => dispatch({ type: "PREV" })}
              disabled={state.currentIndex === 0}
            >
              পূর্ববর্তী
            </Button>

            {isLastQuestion ? (
              <Button onClick={() => setSubmitDialogOpen(true)}>পরীক্ষা জমা দিন</Button>
            ) : (
              <Button onClick={() => dispatch({ type: "NEXT" })}>পরবর্তী</Button>
            )}
          </div>
        </div>

        <aside className="w-full md:w-72 bg-white rounded-xl shadow-sm border p-4 h-fit md:order-1">
          <h3 className="font-semibold text-sm mb-4">প্রশ্ন নেভিগেটর</h3>
          <div className="grid grid-cols-5 gap-2">
            {examMockQuestions.map((q, idx) => {
              const answered = state.answers[q.id] !== undefined;
              const current = state.currentIndex === idx;
              
              let btnClass = "w-10 h-10 p-0 text-sm font-medium transition-all ";
              if (current) btnClass += "ring-2 ring-primary ring-offset-2 ";
              
              return (
                <Button
                  key={q.id}
                  variant={answered ? "default" : "outline"}
                  className={btnClass}
                  onClick={() => dispatch({ type: "GOTO", payload: idx })}
                >
                  {idx + 1}
                </Button>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-gray-600">উত্তর দেওয়া হয়েছে ({Object.keys(state.answers).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-gray-300 rounded-full"></div>
              <span className="text-gray-600">উত্তর দেওয়া হয়নি ({examMockQuestions.length - Object.keys(state.answers).length})</span>
            </div>
          </div>
        </aside>
      </div>

      <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <DialogContent style={{ fontFamily: "inherit" }}>
          <DialogHeader>
            <DialogTitle>পরীক্ষা জমা দিন</DialogTitle>
            <DialogDescription>
              আপনি কি নিশ্চিত যে আপনি আপনার পরীক্ষা জমা দিতে চান? 
              আপনি {examMockQuestions.length} টি প্রশ্নের মধ্যে {Object.keys(state.answers).length} টির উত্তর দিয়েছেন।
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubmitDialogOpen(false)}>বাতিল</Button>
            <Button onClick={handleSubmit}>হ্যাঁ, জমা দিন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
