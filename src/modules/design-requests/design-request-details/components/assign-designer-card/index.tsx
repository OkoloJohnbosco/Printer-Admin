"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function AssignDesignerCard() {
  const [selectedDesigner, setSelectedDesigner] = useState("");

  const availableDesigners = [
    {
      name: "Sarah Chen",
      specialty: "Logo & Branding",
      availability: "Available",
    },
    {
      name: "Mike Johnson",
      specialty: "Apparel Design",
      availability: "Available",
    },
    { name: "Emma Williams", specialty: "Print Design", availability: "Busy" },
  ];

  const handleAssignDesigner = () => {
    console.log("Assigning designer:", selectedDesigner);
  };

  return (
    <Card className="@container/card shadow-none">
      <CardHeader>
        <CardTitle>Assign Designer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-muted-foreground mb-2 block text-sm">
            Select Designer
          </label>
          <Select value={selectedDesigner} onValueChange={setSelectedDesigner}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a designer" />
            </SelectTrigger>
            <SelectContent>
              {availableDesigners.map((designer) => (
                <SelectItem key={designer.name} value={designer.name}>
                  {designer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Available Designers</p>
          {availableDesigners.map((designer) => (
            <div
              key={designer.name}
              className="border-border flex items-center justify-between rounded-md border p-3"
            >
              <div>
                <p className="text-sm font-medium">{designer.name}</p>
                <p className="text-muted-foreground text-xs">
                  {designer.specialty}
                </p>
              </div>
              <Badge
                variant="secondary"
                className={
                  designer.availability === "Available"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted"
                }
              >
                {designer.availability}
              </Badge>
            </div>
          ))}
        </div>

        <Button
          onClick={handleAssignDesigner}
          fullWidth
          disabled={!selectedDesigner}
          variant="default_blue"
        >
          Assign Designer
        </Button>
      </CardContent>
    </Card>
  );
}
