"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileText, User } from "lucide-react";

export default function RequestInfoCard({ requestId }: { requestId: string }) {
  const request = {
    id: requestId,
    date: "2025-09-30",
    customer: {
      name: "Alex Thompson",
      email: "alex.thompson@example.com",
      phone: "+1 (555) 234-5678",
    },
    productType: "T-Shirt Design",
    timeline: "3-5 days",
    status: "Requested",
    priority: "High",
    brief:
      "I need a modern, minimalist design for a tech startup t-shirt. The design should incorporate our logo and tagline 'Innovation Simplified'. Prefer clean lines and a color scheme of navy blue and white. Target audience is young professionals aged 25-35.",
    specifications: {
      size: "Standard adult sizes (S-XXL)",
      colors: "Navy blue, white",
      printLocation: "Front chest and back",
      quantity: "100 units",
    },
    timeline_details: [
      {
        stage: "Request Received",
        date: "2025-09-30 09:00 AM",
        completed: true,
      },
      { stage: "Designer Assigned", date: "Pending", completed: false },
      { stage: "Design In Progress", date: "Pending", completed: false },
      { stage: "Design Completed", date: "Pending", completed: false },
      { stage: "Customer Approved", date: "Pending", completed: false },
    ],
  };

  const statusColors: Record<string, string> = {
    Requested: "bg-muted text-muted-foreground",
    Assigned: "bg-chart-2/10 text-chart-2",
    "In Progress": "bg-primary/10 text-primary",
    Completed: "bg-chart-4/10 text-chart-4",
    Approved: "bg-primary/20 text-primary",
  };

  const priorityColors: Record<string, string> = {
    Low: "bg-muted text-muted-foreground",
    Medium: "bg-chart-2/10 text-chart-2",
    High: "bg-chart-4/10 text-chart-4",
    Urgent: "bg-destructive/10 text-destructive",
  };

  return (
    <Card className="@container/card shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Request Information</CardTitle>
          <div className="flex gap-2">
            <Badge
              variant="secondary"
              className={priorityColors[request.priority]}
            >
              {request.priority} Priority
            </Badge>
            <Badge variant="secondary" className={statusColors[request.status]}>
              {request.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Calendar className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Request Date</p>
              <p className="font-medium">{request.date}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Timeline</p>
              <p className="font-medium">{request.timeline}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileText className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Product Type</p>
              <p className="font-medium">{request.productType}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div>
              <p className="text-muted-foreground text-sm">Customer</p>
              <p className="font-medium">{request.customer.name}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
