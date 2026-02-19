import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import routes from "@/routes";

interface PayoutDetailsErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function PayoutDetailsError({
  message,
  onRetry,
}: PayoutDetailsErrorProps) {
  return (
    <div className="page-fade-in w-full">
      <main>
        <div className="mb-6">
          <Link href={routes.REVENUE_AND_PAYOUT}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Revenue & Payout
            </Button>
          </Link>
        </div>

        <Card className="shadow-none">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="bg-destructive/10 text-destructive mb-4 rounded-full p-4">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">
              Error loading payout details
            </h2>
            <p className="text-muted-foreground mb-6 text-center">
              {message || "Unable to load payout details. Please try again."}
            </p>
            {onRetry && (
              <Button onClick={onRetry} variant="default">
                Try again
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
