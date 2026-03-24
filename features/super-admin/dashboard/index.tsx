import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, CheckCircle } from "lucide-react";

export function SuperAdminDashboardFeature() {
  const stats = [
    { title: "মোট এমসিকিউ", value: "১,২৪৫", icon: FileText, color: "text-blue-600" },
    { title: "মোট ইউজার", value: "৩২০", icon: Users, color: "text-green-600" },
    { title: "অনুষ্ঠিত পরীক্ষা", value: "৪৫", icon: CheckCircle, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">ড্যাশবোর্ড ওভারভিউ</h2>
      
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
