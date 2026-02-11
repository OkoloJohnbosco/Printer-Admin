"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

interface DesignRequestDetailsErrorProps {
  message: string;
  onRetry: () => void;
}

export function DesignRequestDetailsError({
  message,
  onRetry,
}: DesignRequestDetailsErrorProps) {
  return (
    <main className="page-fade-in w-full">
      <div className="mb-6">
        <Link href="/design-requests">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Design Requests
          </Button>
        </Link>
      </div>

      <Card className="mx-auto max-w-md shadow-none">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-destructive/10 mb-4 rounded-full p-3">
              <AlertTriangle className="text-destructive h-8 w-8" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">
              Failed to Load Design Request
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">{message}</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onRetry}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Link href="/design-requests">
                <Button>Back to List</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
