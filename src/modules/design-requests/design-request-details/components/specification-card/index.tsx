"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SpecificationCard({
  requestId,
}: {
  requestId: string;
}) {
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

  return (
    <Card className="@container/card shadow-none">
      <CardHeader>
        <CardTitle>Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Size</p>
            <p className="text-sm font-medium">{request.specifications.size}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Colors</p>
            <p className="text-sm font-medium">
              {request.specifications.colors}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Print Location</p>
            <p className="text-sm font-medium">
              {request.specifications.printLocation}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 text-sm">Quantity</p>
            <p className="text-sm font-medium">
              {request.specifications.quantity}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
