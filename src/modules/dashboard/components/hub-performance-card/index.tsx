import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function HubPerformanceCard() {
  return (
    <Card className="@container/card border-0 shadow-none">
      <CardHeader>
        <CardTitle>Print Hub Status</CardTitle>
        <CardDescription>Current operational status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              name: "NYC Hub",
              status: "Operational",
              orders: 12,
              capacity: 85,
            },
            { name: "LA Hub", status: "Operational", orders: 8, capacity: 45 },
            {
              name: "Chicago Hub",
              status: "Operational",
              orders: 15,
              capacity: 65,
            },
            {
              name: "Miami Hub",
              status: "Maintenance",
              orders: 0,
              capacity: 25,
            },
          ].map((hub, i) => (
            <div
              key={i}
              className="border-border space-y-2 border-b pb-3 last:border-0 last:pb-0"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <p className="text-sm font-medium">{hub.name}</p>
                <p className="text-muted-foreground text-xs">
                  {hub.orders} active orders
                </p>
              </div>
              <Progress value={hub.capacity} className="h-2" />
              <div className="flex w-full items-center justify-between gap-2">
                <p className="text-sm font-normal">{hub.capacity}% capacity</p>

                <span
                  className={`rounded px-2 py-1 text-xs ${
                    hub.status === "Operational"
                      ? "bg-green-100 text-green-900"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {hub.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default HubPerformanceCard;
