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
import { QUERYKEYS } from "@/lib/endpoints";
import useCreateProductTemplate from "@/lib/hooks/admin/use-create-product-template";
import useGetProductSubCategories from "@/lib/hooks/admin/use-get-all-product-sub-categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import SpecificationTypeModal from "./components/specification-type-modal";
import SuccessModal from "./components/success-modal";

// Zod schema for form validation
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

export default function NewOfferingTemplateSection() {
  const getProductSubCategories = useGetProductSubCategories();
  const createProductTemplate = useCreateProductTemplate();
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
      selectedSubCategory: "",
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

  // Modal state for specification type selection
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Watch specifications to track selected types
  const watchedSpecifications = watch("specifications");

  // Available specification types
  const specificationTypes = [
    { value: "sizeOptions", label: "Size Options" },
    { value: "shapeOptions", label: "Shape Options" },
    { value: "sideOptions", label: "Side Options" },
    { value: "coverOptions", label: "Cover Options" },
    { value: "bindingOptions", label: "Binding Options" },
    { value: "paperOptions", label: "Paper Options" },
    { value: "pageOptions", label: "Page Options" },
    { value: "orientationOptions", label: "Orientation Options" },
    { value: "thicknessOptions", label: "Thickness/Material Options" },
    { value: "finishOptions", label: "Finish/Quality Options" },
    { value: "cornersOptions", label: "Corners Options" },
  ];

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

  const onSubmit = (data: FormData) => {
    const template = {
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

    console.log("[v0] Template created:", template);
    createProductTemplate.mutateAsync(template).then(() => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_ALL_PRODUCT_TEMPLATES],
      });
      setIsSuccessModalOpen(true);
    });
  };

  const handleCreateAnother = () => {
    reset();
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <main className="">
        <div className="mb-6 space-y-4">
          <BackButton
            text={
              <span className="text-brand-gray-80">
                Back to Offering Templates
              </span>
            }
          />
          <div>
            <h1 className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
              Create New Template
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Define a template with specifications that print hubs can use when
              creating products
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
                        {getProductSubCategories?.value?.data?.map(
                          (subCategory) => (
                            <SelectItem
                              key={subCategory.id}
                              value={subCategory.id}
                            >
                              {subCategory.name}
                            </SelectItem>
                          ),
                        )}
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
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
            <Link href="/categories" className="w-full sm:w-auto">
              <Button
                variant="outline"
                type="button"
                size="lg"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              isLoading={createProductTemplate.isPending}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Creating..." : "Create Template"}
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
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          onCreateAnother={handleCreateAnother}
          templateName={watch("templateName") || ""}
        />
      </main>
    </div>
  );
}
