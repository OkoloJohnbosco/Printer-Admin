"use client";

import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { specificationTypes } from "@/lib/constants";
import { QUERYKEYS } from "@/lib/endpoints";
import { ProductSubCategory } from "@/lib/hooks/admin/use-get-all-product-sub-categories";
import { ProductTemplate } from "@/lib/hooks/admin/use-get-all-product-templates";
import useUpdateProductTemplate from "@/lib/hooks/admin/use-update-product-template";
import routes from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import SpecificationTypeModal from "../../../add-offering-template/components/specification-type-modal";
import EditSuccessModal from "../../components/edit-success-modal";

// Use the same schema as add template
const specificationSchema = z.object({
  key: z.string().min(1, "Specification type is required"),
  label: z.string().min(1, "Display label is required"),
  availableOptions: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(1, "At least one option is required"),
});

const addonSchema = z.object({
  key: z.string().min(1, "Key is required"),
  label: z.string().min(1, "Label is required"),
  description: z.string().optional(),
});

const formSchema = z.object({
  templateName: z.string().min(1, "Template name is required"),
  selectedSubCategory: z.string().min(1, "Sub-category is required"),
  moq: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0;
  }, "MOQ must be a positive number"),
  specifications: z
    .array(specificationSchema)
    .min(1, "At least one specification is required"),
  addons: z.array(addonSchema),
});

type FormData = z.infer<typeof formSchema>;

interface EditOfferingTemplatePageTemplateProps {
  templateId: string;
  template: ProductTemplate;
  subCategories: ProductSubCategory[];
}

export default function EditOfferingTemplateSection({
  template,
  subCategories,
  templateId,
}: EditOfferingTemplatePageTemplateProps) {
  const updateProductTemplate = useUpdateProductTemplate(templateId);
  const queryClient = useQueryClient();

  // Initialize react-hook-form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      templateName: "",
      selectedSubCategory: template.subCategoryId,
      moq: "1",
      specifications: [
        {
          key: "sizeOptions",
          label: "Size Options",
          availableOptions: [""],
        },
      ],
      addons: [],
    },
  });

  // Field arrays for dynamic specifications and addons
  const {
    fields: specificationFields,
    append: appendSpecification,
    remove: removeSpecification,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  const {
    fields: addonFields,
    append: appendAddon,
    remove: removeAddon,
  } = useFieldArray({
    control,
    name: "addons",
  });

  // Modal state for specification type selection and success
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Watch specifications to track selected types
  const watchedSpecifications = watch("specifications");

  // Available specification types

  // Populate form when template data is loaded
  useEffect(() => {
    if (template) {
      // Convert specifications object to array format
      const specificationEntries = Object.entries(template.specifications || {})
        .filter(
          ([key, value]) =>
            key !== "moq" && Array.isArray(value) && value.length > 0,
        )
        .map(([key, value]) => ({
          key,
          label:
            specificationTypes.find((type) => type.value === key)?.label || key,
          availableOptions: value as string[],
        }));

      // Convert addons to the expected format
      const addonEntries = (template.addons || []).map((addon) => {
        if (typeof addon === "string") {
          return { key: addon, label: addon, description: "" };
        } else {
          return {
            key: addon.key || addon.label,
            label: addon.label,
            description: addon.description || "",
          };
        }
      });

      reset({
        templateName: template.name,
        selectedSubCategory: template.subCategoryId,
        moq: String(template.specifications?.moq || 1),
        specifications:
          specificationEntries.length > 0
            ? specificationEntries
            : [
                {
                  key: "sizeOptions",
                  label: "Size Options",
                  availableOptions: [""],
                },
              ],
        addons: addonEntries,
      });
    }
  }, [template, reset]);

  // Get available specification types (not already selected)
  const getAvailableSpecificationTypes = () => {
    const selectedTypes =
      watchedSpecifications?.map((spec) => spec.key).filter(Boolean) || [];
    return specificationTypes.filter(
      (type) => !selectedTypes.includes(type.value),
    );
  };

  const addSpecificationField = () => {
    setIsModalOpen(true);
  };

  const handleSpecificationTypeSelect = (specType: {
    value: string;
    label: string;
  }) => {
    appendSpecification({
      key: specType.value,
      label: specType.label,
      availableOptions: [""],
    });
  };

  const addAddonField = () => {
    appendAddon({
      key: "",
      label: "",
      description: "",
    });
  };

  const addOption = (specIndex: number) => {
    const currentValues = getValues(
      `specifications.${specIndex}.availableOptions`,
    );
    const newOptions = [...currentValues, ""];
    setValue(`specifications.${specIndex}.availableOptions`, newOptions);
  };

  const removeOption = (specIndex: number, optionIndex: number) => {
    const currentValues = getValues(
      `specifications.${specIndex}.availableOptions`,
    );
    if (currentValues.length > 1) {
      const newOptions = currentValues.filter((_, idx) => idx !== optionIndex);
      setValue(`specifications.${specIndex}.availableOptions`, newOptions);
    }
  };

  const handleCreateAnother = () => {
    reset();
    setIsSuccessModalOpen(false);
  };

  const onSubmit = (data: FormData) => {
    const templateData = {
      name: data.templateName,
      subCategoryId: data.selectedSubCategory,
      specifications: {
        moq: parseInt(data.moq),
        ...data.specifications.reduce(
          (acc, spec) => {
            if (spec.key) {
              acc[spec.key] = spec.availableOptions;
            }
            return acc;
          },
          {} as Record<string, string[]>,
        ),
      },
      addons: data.addons.filter((addon) => addon.key && addon.label),
    };

    console.log("[v0] Template updated:", templateData);
    updateProductTemplate.mutateAsync(templateData).then(() => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_ALL_PRODUCT_TEMPLATES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_PRODUCT_TEMPLATE_BY_ID, templateId],
      });
      setIsSuccessModalOpen(true);
    });
  };

  return (
    <div className="page-fade-in min-h-[calc(100vh_-_96px)] sm:min-h-[calc(100vh_-_120px)]">
      <main className="container mx-auto space-y-6 py-6">
        <div className="mb-6 space-y-4">
          <BackButton
            text={
              <span className="text-brand-gray-80">
                Back to Template Details
              </span>
            }
            href={`${routes.TEMPLATES}/${templateId}`}
          />
          <div>
            <h1 className="mb-2 text-3xl font-bold">Edit Template</h1>
            <p className="text-muted-foreground">
              Update the template specifications and settings
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-4xl gap-6"
        >
          {/* Basic Information */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  placeholder="e.g., Standard Business Card"
                  {...register("templateName")}
                />
                {errors.templateName && (
                  <p className="text-xs text-red-500">
                    {errors.templateName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sub-category">Sub-Category</Label>
                <Controller
                  name="selectedSubCategory"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="sub-category">
                        <SelectValue placeholder="Select a sub-category" />
                      </SelectTrigger>
                      <SelectContent>
                        {subCategories?.map((subCategory) => (
                          <SelectItem
                            key={subCategory.id}
                            value={subCategory.id}
                          >
                            {subCategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedSubCategory && (
                  <p className="text-xs text-red-500">
                    {errors.selectedSubCategory.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="moq">Minimum Order Quantity (MOQ)</Label>
                <Input
                  id="moq"
                  type="number"
                  min="1"
                  placeholder="e.g., 50"
                  {...register("moq")}
                />
                {errors.moq && (
                  <p className="text-xs text-red-500">{errors.moq.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Specifications</CardTitle>
                <Button onClick={addSpecificationField} size="sm" type="button">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Specification
                </Button>
              </div>
              {errors.specifications &&
                !Array.isArray(errors.specifications) && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.specifications.message}
                  </p>
                )}
            </CardHeader>
            <CardContent className="space-y-6">
              {specificationFields.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center text-sm">
                  No specifications added yet. Click &quot;Add
                  Specification&quot; to get started.
                </p>
              ) : (
                specificationFields.map((spec, index) => (
                  <div
                    key={spec.id}
                    className="space-y-4 rounded-lg border p-4"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">Specification {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSpecification(index)}
                        type="button"
                      >
                        <Trash2 className="text-destructive h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Specification Type</Label>
                        <div className="border-input bg-background rounded-md border px-3 py-2 text-sm">
                          {specificationTypes.find(
                            (type) => type.value === spec.key,
                          )?.label || "No type selected"}
                        </div>
                        {/* Hidden input to maintain form data */}
                        <input
                          type="hidden"
                          {...register(`specifications.${index}.key`)}
                        />
                        {errors.specifications?.[index]?.key && (
                          <p className="text-xs text-red-500">
                            {errors.specifications[index]?.key?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Display Label</Label>
                        <Input
                          placeholder="e.g., Size"
                          {...register(`specifications.${index}.label`)}
                        />
                        {errors.specifications?.[index]?.label && (
                          <p className="text-xs text-red-500">
                            {errors.specifications[index]?.label?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Available Options</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(index)}
                          type="button"
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Add Option
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {watch(`specifications.${index}.availableOptions`)?.map(
                          (option: string, optionIndex: number) => (
                            <Fragment key={optionIndex}>
                              <div key={optionIndex} className="flex gap-2">
                                <Input
                                  placeholder={`Option ${optionIndex + 1}`}
                                  {...register(
                                    `specifications.${index}.availableOptions.${optionIndex}`,
                                  )}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeOption(index, optionIndex)
                                  }
                                  disabled={
                                    watch(
                                      `specifications.${index}.availableOptions`,
                                    )?.length === 1
                                  }
                                  type="button"
                                >
                                  <Trash2 className="text-destructive h-4 w-4" />
                                </Button>
                              </div>
                              {errors.specifications?.[index]
                                ?.availableOptions?.[optionIndex] && (
                                <p className="text-xs text-red-500">
                                  {
                                    errors.specifications[index]
                                      ?.availableOptions?.[optionIndex]?.message
                                  }
                                </p>
                              )}
                            </Fragment>
                          ),
                        )}
                      </div>
                      {errors.specifications?.[index]?.availableOptions && (
                        <p className="text-xs text-red-500">
                          {
                            errors.specifications[index]?.availableOptions
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Add-ons */}
          <Card className="shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add-ons (Optional)</CardTitle>
                <Button
                  onClick={addAddonField}
                  size="sm"
                  variant="outline"
                  type="button"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Add-on
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {addonFields.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center text-sm">
                  No add-ons added yet. Add-ons are optional extras customers
                  can select.
                </p>
              ) : (
                addonFields.map((addon, index) => (
                  <div
                    key={addon.id}
                    className="space-y-4 rounded-lg border p-4"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">Add-on {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAddon(index)}
                        type="button"
                      >
                        <Trash2 className="text-destructive h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Key</Label>
                        <Input
                          placeholder="e.g., rounded_corners"
                          {...register(`addons.${index}.key`)}
                        />
                        {errors.addons?.[index]?.key && (
                          <p className="text-xs text-red-500">
                            {errors.addons[index]?.key?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          placeholder="e.g., Rounded Corners"
                          {...register(`addons.${index}.label`)}
                        />
                        {errors.addons?.[index]?.label && (
                          <p className="text-xs text-red-500">
                            {errors.addons[index]?.label?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description (Optional)</Label>
                      <Textarea
                        placeholder="Optional description for this add-on"
                        {...register(`addons.${index}.description`)}
                        rows={2}
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href={`${routes.TEMPLATES}/${templateId}`}>
              <Button variant="outline" type="button" size="lg">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              isLoading={updateProductTemplate.isPending}
            >
              {isSubmitting ? "Updating..." : "Update Template"}
            </Button>
          </div>
        </form>

        {/* Specification Type Selection Modal */}
        <SpecificationTypeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSpecificationTypeSelect}
          availableTypes={getAvailableSpecificationTypes()}
        />

        {/* Success Modal */}
        <EditSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          onCreateAnother={handleCreateAnother}
          templateName={watch("templateName") || ""}
          templateId={templateId}
        />
      </main>
    </div>
  );
}
