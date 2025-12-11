import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QUERYKEYS } from "@/lib/endpoints";
import type { ConfigItem } from "@/lib/hooks/system-config/use-get-system-configs/use-get-system-configs.types";
import useUpdateSystemConfig from "@/lib/hooks/system-config/use-update-system-config";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface EditConfigModalProps {
  config: ConfigItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditConfigModal({
  config,
  open,
  onOpenChange,
  onSuccess,
}: EditConfigModalProps) {
  const queryClient = useQueryClient();
  const updateConfig = useUpdateSystemConfig(config.id);

  const [formData, setFormData] = useState({
    key: config.key || "",
    value:
      typeof config.value === "object"
        ? JSON.stringify(config.value, null, 2)
        : String(config.value),
    description: config.description || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Parse value if it's JSON, otherwise send as number
      let parsedValue: number | object;
      try {
        parsedValue = JSON.parse(formData.value);
      } catch {
        // If not valid JSON, parse as number
        parsedValue = Number(formData.value);
      }

      await updateConfig.mutateAsync({
        key: formData.key,
        value: parsedValue,
        description: formData.description,
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_SYSTEM_CONFIG],
      });
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Failed to update config:", error);
    }
  };

  // Check if all required fields are filled
  const isFormValid =
    formData.key.trim() !== "" &&
    formData.value.trim() !== "" &&
    formData.description.trim() !== "";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Configuration</AlertDialogTitle>
            <AlertDialogDescription>
              Update the configuration settings below
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="key">Key</Label>
              <Input
                id="key"
                value={formData.key}
                onChange={(e) =>
                  setFormData({ ...formData, key: e.target.value })
                }
                placeholder="config_key"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="value">Value</Label>
              <Textarea
                id="value"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                placeholder="Configuration value or JSON"
                rows={8}
                required
                className="font-mono text-sm"
              />
              <p className="text-muted-foreground text-xs">
                For delivery tiers, use JSON array format. For numbers, enter a
                numeric value.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of this configuration"
                rows={2}
                required
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={updateConfig.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={!isFormValid || updateConfig.isPending}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e as React.FormEvent);
              }}
            >
              {updateConfig.isPending ? "Updating..." : "Update Config"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
