"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, UserPlus } from "lucide-react";

export default function DesignRequestsStatsCardRow() {
  const stats = [
    { title: "Total Requests", value: "89", icon: AlertCircle, change: "+8%" },
    { title: "Pending Assignment", value: "12", icon: UserPlus, change: "+3%" },
    { title: "In Progress", value: "23", icon: Clock, change: "+15%" },
    {
      title: "Completed This Week",
      value: "8",
      icon: CheckCircle,
      change: "+20%",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="@container/card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-600">
              {stat.change} from last week
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
