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
import { OrderStatus } from "@/lib/hooks/orders/use-get-all-orders/use-get-all-orders.types";
import { ReassignHubModal } from "../reassign-hub-modal";

interface Hub {
  id: string;
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  city: string;
  state: string;
  status: string;
}

interface AssignedHubCardProps {
  orderStatus: string;
  currentHub: Hub;
  orderId: string;
  availableHubs: Hub[];
  selectedHub: string;
  onSelectedHubChange: (value: string) => void;
  isDifferentHubSelected: boolean;
  onRefetchOrder: () => Promise<unknown>;
}

export function AssignedHubCard({
  orderStatus,
  currentHub,
  orderId,
  availableHubs,
  selectedHub,
  onSelectedHubChange,
  isDifferentHubSelected,
  onRefetchOrder,
}: AssignedHubCardProps) {
  // Only show this card when the order status is REJECTED
  if (orderStatus !== OrderStatus.REJECTED) {
    return null;
  }

  return (
    <Card className="@container/card shadow-none">
      <CardHeader>
        <CardTitle>Assigned Print Hub</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-border rounded-md border p-4">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="font-medium">{currentHub.businessName}</p>
              <p className="text-muted-foreground text-sm">
                {currentHub.businessAddress}
              </p>
              <p className="text-muted-foreground text-sm">
                {currentHub.city}, {currentHub.state}
              </p>
            </div>
            <Badge
              variant={currentHub.status === "active" ? "default" : "secondary"}
              className="capitalize"
            >
              {currentHub.status}
            </Badge>
          </div>
          <div className="border-border mt-3 border-t pt-3">
            <p className="text-muted-foreground text-xs">
              Email: {currentHub.businessEmail}
            </p>
          </div>
        </div>

        <div>
          <label className="text-muted-foreground mb-2 block text-sm">
            Reassign Hub
          </label>
          <Select value={selectedHub} onValueChange={onSelectedHubChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a hub" />
            </SelectTrigger>
            <SelectContent>
              {availableHubs.map((hub) => (
                <SelectItem key={hub.id} value={hub.businessName}>
                  {hub.businessName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Available Hubs</p>
          {availableHubs.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No hubs available at the moment
            </p>
          ) : (
            availableHubs.map((hub) => (
              <div
                key={hub.id}
                className="border-border flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{hub.businessName}</p>
                  <p className="text-muted-foreground text-xs">
                    {hub.city}, {hub.state}
                  </p>
                </div>
                <Badge
                  variant={hub.status === "active" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {hub.status}
                </Badge>
              </div>
            ))
          )}
        </div>

        <ReassignHubModal
          orderId={orderId}
          currentHub={currentHub}
          selectedHubName={selectedHub}
          availableHubs={availableHubs}
          onRefetchOrder={onRefetchOrder}
          trigger={
            <Button
              className="w-full"
              size="lg"
              variant="default_blue"
              disabled={!isDifferentHubSelected}
            >
              Reassign Hub
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
}
