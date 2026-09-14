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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUERYKEYS } from "@/lib/endpoints";
import useCreateSystemConfig from "@/lib/hooks/system-config/use-create-system-config";
import type { ConfigCatalogItem } from "@/lib/hooks/system-config/use-get-system-config-catalog/use-get-system-config-catalog.types";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useMemo, useState } from "react";
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

interface CreateConfigModalProps {
  trigger: ReactNode;
  catalogItems: ConfigCatalogItem[];
  onSuccess: () => void;
}

export function CreateConfigModal({
  trigger,
  catalogItems,
  onSuccess,
}: CreateConfigModalProps) {
  const queryClient = useQueryClient();
  const createConfig = useCreateSystemConfig();
  const [open, setOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const [value, setValue] = useState("");
  const [parseError, setParseError] = useState<string | null>(null);

  const availableItems = useMemo(
    () => catalogItems.filter((item) => !item.configured),
    [catalogItems],
  );

  const selectedItem = useMemo(
    () => availableItems.find((item) => item.key === selectedKey),
    [availableItems, selectedKey],
  );

  useEffect(() => {
    if (!open) {
      setSelectedKey("");
      setValue("");
      setParseError(null);
      return;
    }

    if (!selectedKey && availableItems.length > 0) {
      const firstItem = availableItems[0];
      setSelectedKey(firstItem.key);
      setValue(
        formatConfigValueForEditor(
          getInitialConfigValue(firstItem),
          firstItem.valueType,
        ),
      );
    }
  }, [open, availableItems, selectedKey]);

  const handleKeyChange = (key: string) => {
    const item = availableItems.find((catalogItem) => catalogItem.key === key);
    if (!item) return;

    setSelectedKey(key);
    setParseError(null);
    setValue(
      formatConfigValueForEditor(getInitialConfigValue(item), item.valueType),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    try {
      const parsedValue = parseConfigValueFromEditor(
        value,
        selectedItem.valueType,
      );

      await createConfig.mutateAsync({
        key: selectedItem.key,
        value: parsedValue,
        description: selectedItem.description,
      });

      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_SYSTEM_CONFIG],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_SYSTEM_CONFIG_CATALOG],
      });

      setOpen(false);
      onSuccess();
    } catch (error) {
      if (error instanceof Error && !("response" in error)) {
        setParseError(error.message);
      }
    }
  };

  const isFormValid = Boolean(selectedItem) && value.trim() !== "";

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Configuration</AlertDialogTitle>
            <AlertDialogDescription>
              Choose a supported configuration from the backend catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {availableItems.length === 0 ? (
            <p className="text-muted-foreground py-6 text-sm">
              All supported configurations are already configured.
            </p>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="config-key">Configuration *</Label>
                <Select value={selectedKey} onValueChange={handleKeyChange}>
                  <SelectTrigger id="config-key">
                    <SelectValue placeholder="Select a configuration" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableItems.map((item) => (
                      <SelectItem key={item.key} value={item.key}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedItem && (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{selectedItem.key}</Badge>
                    <Badge variant="secondary">
                      {getValueTypeLabel(selectedItem.valueType)}
                    </Badge>
                    <Badge variant="outline">Not configured</Badge>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    {selectedItem.description}
                  </p>

                  <ConfigExamplePreview example={selectedItem.example} />

                  <ConfigValueEditor
                    id="config-value"
                    valueType={selectedItem.valueType}
                    value={value}
                    onChange={(nextValue) => {
                      setParseError(null);
                      setValue(nextValue);
                    }}
                    example={selectedItem.example}
                  />

                  {parseError && (
                    <p className="text-destructive text-sm">{parseError}</p>
                  )}
                </>
              )}
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={createConfig.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={
                !isFormValid ||
                createConfig.isPending ||
                availableItems.length === 0
              }
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
