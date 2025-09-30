import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function RecentActivityCard() {
  return (
    <Card className="@container/card border-0 shadow-none">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your print hubs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              action: "Order #1284 shipped",
              hub: "NYC Hub",
              time: "2 minutes ago",
              amount: "$335",
            },
            {
              action: "New design request",
              hub: "LA Hub",
              time: "15 minutes ago",
              amount: "$50",
            },
            {
              action: "Order #1283 completed",
              hub: "Chicago Hub",
              time: "1 hour ago",
              amount: "$123",
            },
            {
              action: "New design request",
              hub: "LA Hub",
              time: "15 minutes ago",
              amount: "$50",
            },
            {
              action: "Product added",
              hub: "Miami Hub",
              time: "2 hours ago",
              amount: "$250",
            },
          ].map((activity, i) => (
            <div
              key={i}
              className="border-border flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0"
            >
              <div className="bg-primary mt-2 h-2 w-2 rounded-full" />
              <div className="flex flex-1 items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-muted-foreground text-xs">
                    {activity.hub} • {activity.time}
                  </p>
                </div>
                <div className="text-md font-[800]">{activity.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentActivityCard;
