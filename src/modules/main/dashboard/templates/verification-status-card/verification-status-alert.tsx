import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, Info } from "lucide-react";

function VerificationStatusAlert({ isVerified }: { isVerified?: boolean }) {
  if (!isVerified) {
    return (
      <Alert variant="info">
        <Info />
        <AlertTitle>Get Started</AlertTitle>
        <AlertDescription>
          <p>
            Complete your business information to begin the verification process
            and start accepting print jobs.
          </p>
        </AlertDescription>
      </Alert>
    );
  }
  return (
    <Alert variant="success">
      <CheckCircle2Icon />
      <AlertTitle>Fully Verified</AlertTitle>
      <AlertDescription>
        <p>
          Your print hub has completed all verification steps and is fully
          approved to accept orders.{" "}
        </p>
      </AlertDescription>
    </Alert>
  );
}

export default VerificationStatusAlert;
