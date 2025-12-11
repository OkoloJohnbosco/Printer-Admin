import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import useReassignOrder from "@/lib/hooks/orders/use-reassign-order";
import { AlertTriangle, ArrowDown, Building2 } from "lucide-react";
import { ReactNode, useState } from "react";

interface Hub {
  id: string;
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  city: string;
  state: string;
  status: string;
}

interface ReassignHubModalProps {
  orderId: string;
  currentHub: Hub;
  selectedHubName: string;
  availableHubs: Hub[];
  trigger: ReactNode;
  onRefetchOrder: () => Promise<unknown>;
}

export function ReassignHubModal({
  orderId,
  currentHub,
  selectedHubName,
  availableHubs,
  trigger,
  onRefetchOrder,
}: ReassignHubModalProps) {
  const [open, setOpen] = useState(false);
  const reassignOrder = useReassignOrder(orderId);
  // Find the selected hub from available hubs
  const selectedHub = availableHubs.find(
    (hub) => hub.businessName === selectedHubName,
  );

  const handleConfirm = async () => {
    if (!selectedHub) return;
    reassignOrder
      .mutateAsync({
        hubId: selectedHub.id,
      })
      .then(() => {
        onRefetchOrder().then(() => {
          setOpen(false);
        });
      })
      .catch((error) => {
        console.error("Failed to reassign hub:", error);
      });
  };

  // Check if user has selected a different hub
  const isDifferentHub = selectedHub && selectedHub.id !== currentHub.id;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Reassign Print Hub
          </AlertDialogTitle>
          <AlertDialogDescription>
            Review the hub reassignment details before confirming the change.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          {!isDifferentHub && (
            <div className="bg-muted flex items-start gap-3 rounded-lg p-4">
              <AlertTriangle className="text-muted-foreground mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-medium">No Change Selected</p>
                <p className="text-muted-foreground text-sm">
                  Please select a different hub from the dropdown to reassign
                  this order.
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-[1fr,auto,1fr]">
            {/* Current Hub */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Current Hub</p>
                <Badge variant="outline" className="text-xs">
                  Active
                </Badge>
              </div>
              <div className="border-border bg-card rounded-lg border p-4">
                <p className="font-medium">{currentHub.businessName}</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  {currentHub.businessAddress}
                </p>
                <p className="text-muted-foreground text-sm">
                  {currentHub.city}, {currentHub.state}
                </p>
                <div className="border-border mt-3 border-t pt-3">
                  <p className="text-muted-foreground text-xs">
                    {currentHub.businessEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <ArrowDown className="text-muted-foreground h-6 w-6" />
            </div>

            {/* Selected Hub */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">New Hub</p>
                {selectedHub && (
                  <Badge
                    variant={
                      selectedHub.status === "active" ? "default" : "secondary"
                    }
                    className="text-xs capitalize"
                  >
                    {selectedHub.status}
                  </Badge>
                )}
              </div>
              {selectedHub ? (
                <div className="bg-primary/5 border-primary rounded-lg border p-4">
                  <p className="font-medium">{selectedHub.businessName}</p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {selectedHub.businessAddress}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {selectedHub.city}, {selectedHub.state}
                  </p>
                  <div className="border-border mt-3 border-t pt-3">
                    <p className="text-muted-foreground text-xs">
                      {selectedHub.businessEmail}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border-border rounded-lg border border-dashed p-4">
                  <p className="text-muted-foreground text-sm">
                    No hub selected
                  </p>
                </div>
              )}
            </div>
          </div>

          {isDifferentHub && (
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm font-medium">What happens next?</p>
              <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                <li>• The order will be reassigned to the new hub</li>
                <li>• The customer will be notified of the change</li>
                <li>• Production timeline may be affected</li>
              </ul>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={reassignOrder.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!isDifferentHub || reassignOrder.isPending}
          >
            {reassignOrder.isPending
              ? "Reassigning..."
              : "Confirm Reassignment"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
