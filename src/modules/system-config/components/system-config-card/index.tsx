import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDeleteSystemConfig from "@/lib/hooks/system-config/use-delete-system-config";
import type {
  ConfigCatalogItem,
  DeliveryTier,
  DesignPriceEntry,
} from "@/lib/hooks/system-config/use-get-system-config-catalog/use-get-system-config-catalog.types";
import { Copy, Edit, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { getValueTypeLabel } from "../../utils/config-value";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { EditConfigModal } from "./edit-config-modal";

interface SystemConfigCardProps {
  catalogItem: ConfigCatalogItem;
  onSuccess: () => Promise<unknown>;
}

function isDeliveryTier(value: unknown): value is DeliveryTier {
  return (
    typeof value === "object" &&
    value !== null &&
    "minKm" in value &&
    "basePrice" in value
  );
}

function isDesignPrices(
  value: unknown,
): value is Record<string, DesignPriceEntry> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every(
      (entry) =>
        typeof entry === "object" &&
        entry !== null &&
        "price" in entry &&
        "timeline" in entry,
    )
  );
}

export function SystemConfigCard({
  catalogItem,
  onSuccess,
}: SystemConfigCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteConfig = useDeleteSystemConfig(catalogItem.key);

  const displayValue = catalogItem.configured
    ? catalogItem.currentValue
    : catalogItem.example;

  const handleCopyValue = () => {
    const valueString =
      typeof displayValue === "object"
        ? JSON.stringify(displayValue, null, 2)
        : String(displayValue);
    navigator.clipboard.writeText(valueString);
  };

  const handleDelete = async () => {
    deleteConfig
      .mutateAsync({})
      .then(() => {
        onSuccess().then(() => {
          setShowDeleteDialog(false);
        });
      })
      .catch((error) => {
        console.error("Failed to delete config:", error);
      });
  };

  return (
    <>
      <Card className="shadow-none transition-shadow hover:shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{catalogItem.label}</h3>
                    <Badge variant="outline">{catalogItem.key}</Badge>
                    <Badge variant="secondary">
                      {getValueTypeLabel(catalogItem.valueType)}
                    </Badge>
                    <Badge
                      variant={catalogItem.configured ? "default" : "outline"}
                    >
                      {catalogItem.configured ? "Configured" : "Not configured"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {catalogItem.description}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      {catalogItem.configured ? "Edit" : "Configure"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyValue}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy {catalogItem.configured ? "Value" : "Example"}
                    </DropdownMenuItem>
                    {catalogItem.configured && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setShowDeleteDialog(true)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs">
                  {catalogItem.configured ? "Current value" : "Example value"}
                </p>

                {Array.isArray(displayValue) &&
                displayValue.every(isDeliveryTier) ? (
                  <div className="space-y-2">
                    {displayValue.map((tier, index) => (
                      <div
                        key={index}
                        className="border-border bg-card flex items-center justify-between rounded-md border p-3"
                      >
                        <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-4">
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Min KM
                            </p>
                            <p className="font-medium">{tier.minKm} km</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Max KM
                            </p>
                            <p className="font-medium">
                              {tier.maxKm ? `${tier.maxKm} km` : "Unlimited"}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Base Price
                            </p>
                            <p className="font-medium">₦{tier.basePrice}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">
                              Price/KM
                            </p>
                            <p className="font-medium">₦{tier.pricePerKm}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : isDesignPrices(displayValue) ? (
                  <div className="space-y-2">
                    {Object.entries(displayValue).map(([designType, entry]) => (
                      <div
                        key={designType}
                        className="border-border bg-card flex items-center justify-between rounded-md border p-3"
                      >
                        <div>
                          <p className="font-medium">{designType}</p>
                          <p className="text-muted-foreground text-sm">
                            ₦{entry.price} · {entry.timeline}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : typeof displayValue === "number" ? (
                  <div className="bg-muted rounded-md p-3">
                    <code className="font-mono text-lg font-semibold">
                      {displayValue}
                    </code>
                  </div>
                ) : (
                  <pre className="bg-muted max-h-48 overflow-auto rounded-md p-3 font-mono text-xs">
                    {JSON.stringify(displayValue, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditConfigModal
        catalogItem={catalogItem}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSuccess={onSuccess}
      />

      {catalogItem.configured && (
        <DeleteConfirmDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleDelete}
          configKey={catalogItem.key}
          isDeleting={deleteConfig.isPending}
        />
      )}
    </>
  );
}
