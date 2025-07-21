import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import ProgressStats from "../../components/progress-stats";
import VerificationStatusAlert from "./verification-status-alert";

function VerificationStatusCard() {
  return (
    <Card className="@container/card shadow-none border-0">
      <CardHeader>
        <CardTitle>
          <Heading size="h7" className="font-[700]">
            Verification Status
          </Heading>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-2 space-y-6 sm:px-6">
        <div className="space-y-4">
          <ProgressStats status="in_progress" title="Business Information" />
          <ProgressStats status="not_started" title="Equipment Verification" />
          <ProgressStats status="completed" title="Sample Prints" />
          <ProgressStats status="in_progress" title="Quality Assessment" />
          <ProgressStats status="not_started" title="Final Approval" />
        </div>

        <VerificationStatusAlert isVerified={false} />
      </CardContent>
    </Card>
  );
}

export default VerificationStatusCard;
