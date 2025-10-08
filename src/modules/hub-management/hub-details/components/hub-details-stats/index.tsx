"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Package, TrendingUp } from "lucide-react";

function HubDetailsStats() {
  return (
    <div className="mb-6 grid gap-6 md:grid-cols-3">
      <Card className="@container/card shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Active Orders
          </CardTitle>
          <Package className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-primary text-xs">Currently processing</p>
        </CardContent>
      </Card>

      <Card className="@container/card shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Completed Today
          </CardTitle>
          <TrendingUp className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-primary text-xs">+15% from yesterday</p>
        </CardContent>
      </Card>

      <Card className="@container/card shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Avg Processing Time
          </CardTitle>
          <Clock className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-primary text-xs">-12% from last week</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default HubDetailsStats;
