"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { printHubs } from "@/lib/constants";
import { Clock, MapPin, Package, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PrintHubGrid() {
  return (
    <div className="print-hub-grid page-fade-in border-t pt-5">
      {printHubs.map((hub) => (
        <Card key={hub.id} className="@container/card shadow-none">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Image
                    src={"/logo-sm.svg"}
                    alt="logo image"
                    width={40}
                    height={40}
                    priority
                    className="transition-transform duration-200 group-hover:opacity-0"
                  />
                </div>
                <div>
                  <CardTitle className="mb-1">{hub.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {hub.location}
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={
                  hub.status === "Operational"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }
              >
                {hub.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>{hub.address}</span>
            </div>

            <div className="border-border grid grid-cols-3 gap-4 border-t pt-4">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Package className="text-muted-foreground h-4 w-4" />
                  <p className="text-muted-foreground text-xs">Active Orders</p>
                </div>
                <p className="text-2xl font-bold">{hub.activeOrders}</p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <TrendingUp className="text-muted-foreground h-4 w-4" />
                  <p className="text-muted-foreground text-xs">Completed</p>
                </div>
                <p className="text-2xl font-bold">{hub.completedToday}</p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Clock className="text-muted-foreground h-4 w-4" />
                  <p className="text-muted-foreground text-xs">Avg Time</p>
                </div>
                <p className="text-lg font-bold">{hub.avgProcessingTime}</p>
              </div>
            </div>

            <div className="border-border border-t pt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Capacity</span>
                <span className="text-sm font-medium">{hub.capacity}%</span>
              </div>
              <div className="bg-muted h-2 overflow-hidden rounded-full">
                <div
                  className={`h-full ${hub.capacity > 80 ? "bg-destructive" : "bg-green-700"}`}
                  style={{ width: `${hub.capacity}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Link href={`/print-hubs/${hub.id}`} className="flex-1">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full bg-transparent"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PrintHubGrid;
