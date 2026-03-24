import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, BookOpen, Clock } from "lucide-react";

export function AdminDashboardFeature() {
  const stats = [
    { title: "তৈরিকৃত পরীক্ষা", value: "১২", icon: CheckSquare, color: "text-blue-600" },
    { title: "ব্যবহৃত প্রশ্ন", value: "২৪৫", icon: BookOpen, color: "text-green-600" },
    { title: "গড় সময় (মিনিট)", value: "৪৫", icon: Clock, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">শিক্ষক ড্যাশবোর্ড</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
