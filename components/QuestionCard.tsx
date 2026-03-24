import { MCQ } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionCardProps {
  question: MCQ;
  questionNumber: number;
  selectedOptionIndex?: number;
  onSelectOption: (optionIndex: number) => void;
  showExplanation?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  selectedOptionIndex,
  onSelectOption,
  showExplanation,
}: QuestionCardProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg leading-relaxed font-medium">
          <span className="text-gray-500 mr-2">প্রশ্ন {questionNumber}:</span>
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedOptionIndex?.toString()}
          onValueChange={(val) => onSelectOption(parseInt(val, 10))}
          className="space-y-3"
          disabled={showExplanation}
        >
          {question.options.map((option, index) => {
            let itemClass = "flex items-center space-x-3 p-3 border rounded-lg transition-colors ";
            
            if (showExplanation) {
              if (index === question.correctOptionIndex) {
                itemClass += "bg-green-50 border-green-200";
              } else if (index === selectedOptionIndex) {
                itemClass += "bg-red-50 border-red-200";
              } else {
                itemClass += "opacity-50";
              }
            } else {
              itemClass += selectedOptionIndex === index ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50 cursor-pointer";
            }

            return (
              <div key={index} className={itemClass}>
                <RadioGroupItem value={index.toString()} id={`option-${question.id}-${index}`} />
                <Label
                  htmlFor={`option-${question.id}-${index}`}
                  className={`grow text-sm md:text-base leading-snug cursor-pointer ${showExplanation ? "cursor-default" : ""}`}
                >
                  {option}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {showExplanation && question.explanation && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg text-sm text-gray-700">
            <p className="font-semibold mb-1">ব্যাখ্যা:</p>
            <p>{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
