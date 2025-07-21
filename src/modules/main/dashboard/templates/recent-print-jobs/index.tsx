import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import RecentPrintJobsEmptyState from "../../components/recent-print-jobs-empty-state";

function RecentPrintJobs() {
  return (
    <Card className="@container/card shadow-none border-0">
      <CardHeader>
        <CardTitle className="justify-between flex items-center">
          <Heading size="h7" className="font-[700]">
            Recent Print Jobs
          </Heading>
          <Button size="sm" className="text-xs text-white">
            <Plus />
            Set Up Print Services
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-2 space-y-6 sm:px-6">
        <RecentPrintJobsEmptyState />
      </CardContent>
    </Card>
  );
}

export default RecentPrintJobs;
