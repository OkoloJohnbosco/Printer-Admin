"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Shield, UserCheck, Users } from "lucide-react";

export default function UserStatsRow() {
  const stats = [
    {
      title: "Total Users",
      value: "12,450",
      icon: Users,
      change: "+245 this month",
      changeType: "positive",
    },
    {
      title: "Active Users",
      value: "11,892",
      icon: Activity,
      change: "95.5% active rate",
      changeType: "positive",
    },
    {
      title: "Verified Users",
      value: "10,234",
      icon: UserCheck,
      change: "82.2% verified",
      changeType: "positive",
    },
    {
      title: "Suspended Users",
      value: "558",
      icon: Shield,
      change: "4.5% of total",
      changeType: "neutral",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="@container/card shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.changeType === "positive"
                  ? "text-success"
                  : "text-muted-foreground"
              }`}
            >
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
