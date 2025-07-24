import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { ChartSpline, Printer } from "lucide-react";

export default function NoRevenueCard() {
  return (
    <Card className="@container/card shadow-none border-0">
      <CardContent className="px-2 py-6 space-y-6 sm:px-6">
        <div className="space-y-4 pt-4 h-full flex flex-col justify-center items-center text-brand-gray-200">
          <div className="h-16 w-16 grid place-items-center bg-brand-foreground rounded-full">
            <ChartSpline className="h-4 w-4 text-brand-primary" />
          </div>
          <div className="text-center space-y-1">
            <Heading size="h6">No Revenue Data Yet</Heading>
            <p className="text-nm max-w-md text-center">
              Complete your first print job to start tracking your earnings.
              Your revenue chart will appear here once you begin earning.
            </p>
          </div>
        </div>
        <div className="text-center">
          <Button size="sm" className="text-xs text-white">
            <Printer />
            Start Your First Job
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
