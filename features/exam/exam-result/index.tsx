"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/QuestionCard";
import { MCQ } from "@/types";
import { CheckCircle2, XCircle, Home } from "lucide-react";

const examMockQuestions: MCQ[] = [
  {
    id: "m1",
    question: "কোষের পাওয়ার হাউস কোনটি?",
    options: ["নিউক্লিয়াস", "মাইটোকন্ড্রিয়া", "রাইবোজোম", "এন্ডোপ্লাজমিক রেটিকুলাম"],
    correctOptionIndex: 1,
    explanation: "মাইটোকন্ড্রিয়া কোষের জৈব রাসায়নিক বিক্রিয়ায় প্রয়োজনীয় অধিকাংশ রাসায়নিক শক্তির উৎপাদন করে।",
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
    explanation: "মার্জ সর্ট হলো একটি কার্যকরী ও সাধারণ উদ্দেশ্যমূলক সর্টিং অ্যালগরিদম।",
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
    explanation: "সাধারণ গাণিতিক যোগ।",
    subject: "Math",
    chapter: "Basic",
    topic: "Addition",
    difficulty: "easy",
  },
];

export function ExamResultFeature() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(`exam_result_${examId}`);
    if (raw) {
      setAnswers(JSON.parse(raw));
    }
    setCalculated(true);
  }, [examId]);

  if (!calculated) return null;

  const totalQuestions = examMockQuestions.length;
  const attempted = Object.keys(answers).length;
  let correct = 0;

  examMockQuestions.forEach(q => {
    if (answers[q.id] === q.correctOptionIndex) {
      correct++;
    }
  });

  const scorePercentage = Math.round((correct / totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 mt-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">পরীক্ষার ফলাফল</h1>
        <p className="text-gray-500">আপনি সফলভাবে পরীক্ষাটি সম্পন্ন করেছেন।</p>
        
        <div className="flex justify-center flex-wrap gap-4 mt-8">
          <Card className="w-48 text-center border-green-200 bg-green-50 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-800">স্কোর</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-700">{scorePercentage}%</div>
            </CardContent>
          </Card>
          
          <Card className="w-48 text-center shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">সঠিক</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <div className="text-3xl font-bold text-gray-800">{correct}/{totalQuestions}</div>
            </CardContent>
          </Card>

          <Card className="w-48 text-center shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">অংশগ্রহণ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-800">{attempted}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => router.push("/")}>
          <Home className="w-4 h-4 mr-2" /> ড্যাশবোর্ডে ফিরে যান
        </Button>
      </div>

      <div className="pt-8 space-y-8">
        <h2 className="text-2xl font-semibold">উত্তরসমূহ পর্যালোচনা করুন</h2>
        
        {examMockQuestions.map((q, idx) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correctOptionIndex;
          const isAttempted = userAnswer !== undefined;

          return (
            <div key={q.id} className="relative">
              <div className="absolute -left-12 top-6">
                {isCorrect ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500 bg-white rounded-full" />
                ) : isAttempted ? (
                  <XCircle className="w-8 h-8 text-red-500 bg-white rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-xs font-bold text-gray-400">?</div>
                )}
              </div>
              <QuestionCard
                question={q}
                questionNumber={idx + 1}
                selectedOptionIndex={userAnswer}
                onSelectOption={() => {}} // Disabled in review mode
                showExplanation={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
