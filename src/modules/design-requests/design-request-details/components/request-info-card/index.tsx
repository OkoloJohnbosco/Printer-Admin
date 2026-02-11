"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DesignerRequest } from "@/lib/hooks/design-requests/use-get-all-designer-requests/use-get-all-designer-requests.types";
import {
  formatStatusText,
  formatToFullYMD,
  getDesignerRequestStatusBadgeVariant,
} from "@/lib/utils";
import { Calendar, FileText, PenTool, User } from "lucide-react";

interface RequestInfoCardProps {
  request: DesignerRequest;
}

export default function RequestInfoCard({ request }: RequestInfoCardProps) {
  const customerName = `${request.user.firstName} ${request.user.lastName}`;

  return (
    <Card className="@container/card shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Request Information</CardTitle>
          <Badge variant={getDesignerRequestStatusBadgeVariant(request.status)}>
            {formatStatusText(request.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Request Date</p>
              <p className="font-medium">
                {formatToFullYMD(request.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <PenTool className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Style</p>
              <p className="font-medium capitalize">
                {request.preferences?.style || "Not specified"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileText className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Type</p>
              <p className="font-medium capitalize">{request.type}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Customer</p>
              <p className="font-medium">{customerName}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
