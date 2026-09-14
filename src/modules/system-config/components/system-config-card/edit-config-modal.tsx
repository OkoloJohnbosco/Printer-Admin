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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { QUERYKEYS } from "@/lib/endpoints";
import useCreateSystemConfig from "@/lib/hooks/system-config/use-create-system-config";
import type { ConfigCatalogItem } from "@/lib/hooks/system-config/use-get-system-config-catalog/use-get-system-config-catalog.types";
import useUpdateSystemConfig from "@/lib/hooks/system-config/use-update-system-config";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ConfigExamplePreview,
  ConfigValueEditor,
} from "../config-value-editor";
import {
  formatConfigValueForEditor,
  getInitialConfigValue,
  getValueTypeLabel,
  parseConfigValueFromEditor,
} from "../../utils/config-value";

interface EditConfigModalProps {
  catalogItem: ConfigCatalogItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditConfigModal({
  catalogItem,
  open,
  onOpenChange,
  onSuccess,
}: EditConfigModalProps) {
  const queryClient = useQueryClient();
  const createConfig = useCreateSystemConfig();
  const updateConfig = useUpdateSystemConfig(catalogItem.key);
  const [value, setValue] = useState("");
  const [parseError, setParseError] = useState<string | null>(null);

  const isSaving = createConfig.isPending || updateConfig.isPending;

  useEffect(() => {
    if (!open) return;

    setParseError(null);
    setValue(
      formatConfigValueForEditor(
        getInitialConfigValue(catalogItem),
        catalogItem.valueType,
      ),
    );
  }, [catalogItem, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const parsedValue = parseConfigValueFromEditor(
        value,
        catalogItem.valueType,
      );

      if (catalogItem.configured) {
        await updateConfig.mutateAsync({
          value: parsedValue,
          description: catalogItem.description,
        });
      } else {
        await createConfig.mutateAsync({
          key: catalogItem.key,
          value: parsedValue,
          description: catalogItem.description,
        });
      }

      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_SYSTEM_CONFIG],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_SYSTEM_CONFIG_CATALOG],
      });

      onOpenChange(false);
      onSuccess();
    } catch (error) {
      if (error instanceof Error && !("response" in error)) {
        setParseError(error.message);
      }
    }
  };

  const isFormValid = value.trim() !== "";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {catalogItem.configured
                ? "Edit Configuration"
                : "Configure Setting"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {catalogItem.configured
                ? "Update the selected configuration value."
                : "Create this configuration using the supported backend key."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Configuration</Label>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{catalogItem.key}</Badge>
                <Badge variant="secondary">
                  {getValueTypeLabel(catalogItem.valueType)}
                </Badge>
                {!catalogItem.configured && (
                  <Badge variant="outline">Not configured</Badge>
                )}
              </div>
              <p className="font-medium">{catalogItem.label}</p>
            </div>

            <p className="text-muted-foreground text-sm">
              {catalogItem.description}
            </p>

            <ConfigExamplePreview example={catalogItem.example} />

            <ConfigValueEditor
              id="edit-config-value"
              valueType={catalogItem.valueType}
              value={value}
              onChange={(nextValue) => {
                setParseError(null);
                setValue(nextValue);
              }}
              example={catalogItem.example}
            />

            {parseError && (
              <p className="text-destructive text-sm">{parseError}</p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={!isFormValid || isSaving}
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e as React.FormEvent);
              }}
            >
              {isSaving
                ? "Saving..."
                : catalogItem.configured
                  ? "Update Config"
                  : "Save Config"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
