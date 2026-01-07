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
import { Skeleton } from "@/components/ui/skeleton";
import { OrderStatus } from "@/lib/hooks/orders/use-get-all-orders/use-get-all-orders.types";
import useGetEligibleHubs from "@/lib/hooks/orders/use-get-eligible-hubs";
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
  selectedHub: string;
  onSelectedHubChange: (value: string) => void;
  onRefetchOrder: () => Promise<unknown>;
}

export function AssignedHubCard({
  orderStatus,
  currentHub,
  orderId,
  selectedHub,
  onSelectedHubChange,
  onRefetchOrder,
}: AssignedHubCardProps) {
  const getEligibleHubs = useGetEligibleHubs(orderId ?? "");
  const eligibleHubs = getEligibleHubs.value?.data || [];
  const isLoadingHubs = getEligibleHubs.isLoading;

  // Check if selected hub is different from current hub and exists in eligible hubs
  const selectedHubExists = eligibleHubs.some((hub) => hub.id === selectedHub);
  const isDifferentHubSelected = Boolean(
    selectedHub && selectedHub !== currentHub.id && selectedHubExists,
  );

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
          <Select
            value={selectedHub}
            onValueChange={onSelectedHubChange}
            disabled={isLoadingHubs}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a hub" />
            </SelectTrigger>
            <SelectContent>
              {eligibleHubs.map((hub) => (
                <SelectItem key={hub.id} value={hub.id}>
                  {hub.businessName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Eligible Hubs</p>
          {isLoadingHubs ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="border-border flex items-center justify-between rounded-md border p-3"
                >
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </div>
          ) : eligibleHubs.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No hubs eligible at the moment
            </p>
          ) : (
            eligibleHubs.map((hub) => (
              <div
                key={hub.id}
                className="border-border flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{hub.businessName}</p>
                  <p className="text-muted-foreground text-xs">
                    {hub.businessAddress}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <ReassignHubModal
          orderId={orderId}
          currentHub={currentHub}
          selectedHubName={selectedHub}
          eligibleHubs={eligibleHubs}
          onRefetchOrder={onRefetchOrder}
          trigger={
            <Button
              className="w-full"
              size="lg"
              variant="default_blue"
              disabled={!isDifferentHubSelected}
              isLoading={isLoadingHubs}
            >
              Reassign Hub
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
}
