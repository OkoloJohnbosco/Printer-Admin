import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, MapPin } from "lucide-react";

function QuickActionCard() {
  return (
    <Card className="@container/card border-0 shadow-none">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3">
            <AlertCircle className="text-warning h-5 w-5" />
            <div>
              <p className="font-medium">Pending Assignments</p>
              <p className="text-muted-foreground text-sm">
                12 orders need hubs
              </p>
            </div>
          </div>
          <div className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3">
            <Clock className="text-info h-5 w-5" />
            <div>
              <p className="font-medium">Design Requests</p>
              <p className="text-muted-foreground text-sm">
                5 awaiting assignment
              </p>
            </div>
          </div>
          <div className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3">
            <MapPin className="text-success h-5 w-5" />
            <div>
              <p className="font-medium">Hub Status</p>
              <p className="text-muted-foreground text-sm">
                All hubs operational
              </p>
            </div>
          </div>
          <div className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-lg border p-3">
            <CheckCircle className="text-success h-5 w-5" />
            <div>
              <p className="font-medium">Today&apos;s Completed</p>
              <p className="text-muted-foreground text-sm">
                23 orders finished
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuickActionCard;
