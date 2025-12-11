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
import type { ConfigItem } from "@/lib/hooks/system-config/use-get-system-configs/use-get-system-configs.types";
import { formatToMDY } from "@/lib/utils";
import { Calendar, Copy, Edit, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { EditConfigModal } from "./edit-config-modal";

interface SystemConfigCardProps {
  config: ConfigItem;
  onSuccess: () => void;
}

export function SystemConfigCard({ config, onSuccess }: SystemConfigCardProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteConfig = useDeleteSystemConfig(config.id);

  const handleCopyValue = () => {
    const valueString =
      typeof config.value === "object"
        ? JSON.stringify(config.value, null, 2)
        : String(config.value);
    navigator.clipboard.writeText(valueString);
    // TODO: Add toast notification
  };

  const handleDelete = async () => {
    try {
      await deleteConfig.mutateAsync({});
      setShowDeleteDialog(false);
      onSuccess();
    } catch (error) {
      console.error("Failed to delete config:", error);
    }
  };

  // Determine config type based on value
  const configType = Array.isArray(config.value) ? "Delivery Tiers" : "Number";
  const configBadgeVariant = Array.isArray(config.value)
    ? "default"
    : "secondary";

  return (
    <>
      <Card className="shadow-none transition-shadow hover:shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-semibold">{config.key}</h3>
                    <Badge variant={configBadgeVariant}>{configType}</Badge>
                  </div>
                  {config.description && (
                    <p className="text-muted-foreground text-sm">
                      {config.description}
                    </p>
                  )}
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
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyValue}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Value
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setShowDeleteDialog(true)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Value */}
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs">Value</p>
                {Array.isArray(config.value) ? (
                  // Display each delivery tier as a card
                  <div className="space-y-2">
                    {config.value.map((tier, index) => (
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyValue}
                          className="ml-2"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Display number value
                  <div className="bg-muted rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <code className="font-mono text-lg font-semibold">
                        {config.value}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyValue}
                        className="ml-2"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Metadata */}
              <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
                {config.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Created {formatToMDY(config.createdAt)}</span>
                  </div>
                )}
                {config.updatedAt && config.updatedAt !== config.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Updated {formatToMDY(config.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <EditConfigModal
        config={config}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSuccess={onSuccess}
      />

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        configKey={config.key}
        isDeleting={deleteConfig.isPending}
      />
    </>
  );
}
