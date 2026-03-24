"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  durationMinutes: number;
  onTimeUp: () => void;
}

export function Timer({ durationMinutes, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");
  const timeString = hours > 0 
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;

  const isWarning = timeLeft < 300; // Less than 5 minutes

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-medium shadow-sm border ${
      isWarning ? "bg-red-50 text-red-600 border-red-200 animate-pulse" : "bg-white text-gray-700"
    }`}>
      <Clock size={20} className={isWarning ? "text-red-500" : "text-gray-500"} />
      {timeString}
    </div>
  );
}
