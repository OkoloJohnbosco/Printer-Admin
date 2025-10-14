"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

interface SpecificationTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (specType: { value: string; label: string }) => void;
  availableTypes: { value: string; label: string }[];
}

function SpecificationTypeModal({
  isOpen,
  onClose,
  onSelect,
  availableTypes,
}: SpecificationTypeModalProps) {
  const [selectedType, setSelectedType] = useState("");

  const handleSelect = () => {
    if (selectedType) {
      const specType = availableTypes.find(
        (type) => type.value === selectedType,
      );
      if (specType) {
        onSelect(specType);
        setSelectedType("");
        onClose();
      }
    }
  };

  const handleCancel = () => {
    setSelectedType("");
    onClose();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="sm:max-w-md" onEscapeKeyDown={onClose}>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Specification</AlertDialogTitle>
          <AlertDialogDescription>
            Choose a specification type to add to your template. Each type can
            only be used once.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          {availableTypes.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground text-sm">
                All specification types have been added to your template.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Available Specification Types:
              </Label>
              <RadioGroup
                value={selectedType}
                onValueChange={setSelectedType}
                className="max-h-64 space-y-2 overflow-y-auto"
              >
                {availableTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label
                      htmlFor={type.value}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>

        <AlertDialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSelect}
            disabled={!selectedType || availableTypes.length === 0}
          >
            Add Specification
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SpecificationTypeModal;
