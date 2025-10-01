"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AssignDesignerCard from "./components/assign-designer-card";
import RequestInfoCard from "./components/request-info-card";
import SpecificationCard from "./components/specification-card";

export default function DesignRequestDetailPageTemplate({
  params,
}: {
  params: { id: string };
}) {
  const [status, setStatus] = useState("Requested");
  const [notes, setNotes] = useState("");

  const request = {
    id: params.id,
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

  const handleStatusUpdate = () => {
    console.log("Updating status to:", status);
  };

  return (
    <main className="page-fade-in w-full">
      <div className="mb-6">
        <Link href="/design-requests">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Design Requests
          </Button>
        </Link>
        <h1 className="mb-2 text-3xl font-bold">Design Request Details</h1>
        <p className="text-muted-foreground">
          Review and manage design request {params.id}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <RequestInfoCard requestId={params.id} />

          <Card className="@container/card shadow-none">
            <CardHeader>
              <CardTitle>Design Brief</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{request.brief}</p>
            </CardContent>
          </Card>

          <SpecificationCard requestId={params.id} />

          <Card className="@container/card shadow-none">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Name</span>
                  <span className="text-sm font-medium">
                    {request.customer.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Email</span>
                  <span className="text-sm font-medium">
                    {request.customer.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Phone</span>
                  <span className="text-sm font-medium">
                    {request.customer.phone}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="@container/card shadow-none">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {request.timeline_details.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`mt-2 h-2 w-2 rounded-full ${item.completed ? "bg-primary" : "bg-muted"}`}
                    />
                    <div className="border-border flex-1 border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <p
                          className={`font-medium ${item.completed ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {item.stage}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {request.status === "Requested" && (
            <Card className="border-brand-alternative bg-brand-alternative/5">
              <CardContent className="pt-6">
                <div className="mb-4 flex items-start gap-3">
                  <AlertCircle className="text-brand-alternative mt-0.5 h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium">Action Required</p>
                    <p className="text-muted-foreground text-xs">
                      This request needs a designer assignment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <AssignDesignerCard />

          <Card className="@container/card shadow-none">
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-muted-foreground mb-2 block text-sm">
                  Current Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Requested">Requested</SelectItem>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleStatusUpdate}
                fullWidth
                variant="default_blue"
              >
                Update Status
              </Button>
            </CardContent>
          </Card>

          <Card className="@container/card shadow-none">
            <CardHeader>
              <CardTitle>Admin Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Add internal notes about this request..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
              <Button variant="outline" className="w-full bg-transparent">
                Save Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
