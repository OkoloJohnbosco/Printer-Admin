"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DesignerRequest } from "@/lib/hooks/design-requests/use-get-all-designer-requests/use-get-all-designer-requests.types";

interface SpecificationCardProps {
  request: DesignerRequest;
}

export default function SpecificationCard({ request }: SpecificationCardProps) {
  const preferences = request.preferences;

  return (
    <Card className="@container/card shadow-none">
      <CardHeader>
        <CardTitle>Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Style</p>
            <p className="text-sm font-medium capitalize">
              {preferences?.style || "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Colors</p>
            <div className="flex flex-wrap gap-1">
              {preferences?.colors?.length > 0 ? (
                preferences.colors.map((color, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {color}
                  </Badge>
                ))
              ) : (
                <p className="text-sm font-medium">Not specified</p>
              )}
            </div>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground mb-1 text-sm">Deliverables</p>
            <div className="flex flex-wrap gap-1">
              {preferences?.deliverables?.length > 0 ? (
                preferences.deliverables.map((deliverable, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {deliverable}
                  </Badge>
                ))
              ) : (
                <p className="text-sm font-medium">Not specified</p>
              )}
            </div>
          </div>
          {preferences?.instructions && (
            <div className="col-span-2">
              <p className="text-muted-foreground mb-1 text-sm">Instructions</p>
              <p className="text-sm font-medium">{preferences.instructions}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
