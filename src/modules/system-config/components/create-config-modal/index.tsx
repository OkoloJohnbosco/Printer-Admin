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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QUERYKEYS } from "@/lib/endpoints";
import useCreateSystemConfig from "@/lib/hooks/system-config/use-create-system-config";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface CreateConfigModalProps {
  trigger: ReactNode;
  onSuccess: () => void;
}

export function CreateConfigModal({
  trigger,
  onSuccess,
}: CreateConfigModalProps) {
  const queryClient = useQueryClient();
  const createConfig = useCreateSystemConfig();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    key: "",
    value: "",
    description: "",
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

      await createConfig.mutateAsync({
        key: formData.key,
        value: parsedValue,
        description: formData.description,
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_SYSTEM_CONFIG],
      });
      setOpen(false);
      setFormData({
        key: "",
        value: "",
        description: "",
      });
      onSuccess();
    } catch (error) {
      console.error("Failed to create config:", error);
    }
  };

  // Check if all required fields are filled
  const isFormValid =
    formData.key.trim() !== "" &&
    formData.value.trim() !== "" &&
    formData.description.trim() !== "";

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Configuration</AlertDialogTitle>
            <AlertDialogDescription>
              Add a new system configuration setting
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="key">Key *</Label>
              <Input
                id="key"
                value={formData.key}
                onChange={(e) =>
                  setFormData({ ...formData, key: e.target.value })
                }
                placeholder="e.g., max_upload_size, delivery_pricing"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="value">Value *</Label>
              <Textarea
                id="value"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                placeholder="Configuration value or JSON array"
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
              <Label htmlFor="description">Description *</Label>
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
            <AlertDialogCancel disabled={createConfig.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={!isFormValid || createConfig.isPending}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e as React.FormEvent);
              }}
            >
              {createConfig.isPending ? "Creating..." : "Create Config"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
