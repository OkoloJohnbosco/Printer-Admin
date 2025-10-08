"use client";

import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema for form validation
const specificationSchema = z.object({
  key: z.string().min(1, "Specification type is required"),
  label: z.string().min(1, "Display label is required"),
  value: z.string().min(1, "Default option is required"),
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
  const router = useRouter();

  // Initialize react-hook-form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      templateName: "",
      selectedSubCategory: "",
      moq: "1",
      specifications: [
        {
          key: "",
          label: "",
          value: "",
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
    update: updateSpecification,
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

  // Mock categories data - in real app, fetch from API
  const categories = [
    {
      id: "1",
      name: "Marketing Materials",
      subCategories: [
        { id: "1-1", name: "Business Cards" },
        { id: "1-2", name: "Flyers & Handbills" },
        { id: "1-3", name: "Posters" },
        { id: "1-4", name: "Brochures" },
      ],
    },
    {
      id: "2",
      name: "Custom Apparel",
      subCategories: [
        { id: "2-1", name: "Shirts & Hoodies" },
        { id: "2-2", name: "Caps" },
        { id: "2-3", name: "Tote Bags" },
      ],
    },
    {
      id: "3",
      name: "Stationery & Office",
      subCategories: [
        { id: "3-1", name: "Notepads" },
        { id: "3-2", name: "Envelopes" },
        { id: "3-3", name: "Letterheads" },
      ],
    },
  ];

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

  const addSpecificationField = () => {
    appendSpecification({
      key: "",
      label: "",
      value: "",
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
    const currentSpec = specificationFields[specIndex];
    updateSpecification(specIndex, {
      ...currentSpec,
      availableOptions: [...currentSpec.availableOptions, ""],
    });
  };

  const removeOption = (specIndex: number, optionIndex: number) => {
    const currentSpec = specificationFields[specIndex];
    if (currentSpec.availableOptions.length > 1) {
      updateSpecification(specIndex, {
        ...currentSpec,
        availableOptions: currentSpec.availableOptions.filter(
          (_, idx) => idx !== optionIndex,
        ),
      });
    }
  };

  const updateOption = (
    specIndex: number,
    optionIndex: number,
    value: string,
  ) => {
    const currentSpec = specificationFields[specIndex];
    const newOptions = [...currentSpec.availableOptions];
    newOptions[optionIndex] = value;
    updateSpecification(specIndex, {
      ...currentSpec,
      availableOptions: newOptions,
    });
  };

  const onSubmit = (data: FormData) => {
    const template = {
      name: data.templateName,
      subCategoryId: data.selectedSubCategory,
      specifications: {
        moq: parseInt(data.moq),
        ...data.specifications.reduce(
          (acc, spec) => {
            if (spec.key && spec.value) {
              acc[spec.key] = spec.value;
            }
            return acc;
          },
          {} as Record<string, string>,
        ),
      },
      addons: data.addons.filter((addon) => addon.key && addon.label),
    };

    console.log("[v0] Template created:", template);
    // In real app, send to API
    router.push("/categories");
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
            <h1 className="mb-2 text-3xl font-bold">Create New Template</h1>
            <p className="text-muted-foreground">
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
                  <p className="text-sm text-red-500">
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
                        {categories.map((category) => (
                          <div key={category.id}>
                            <div className="text-muted-foreground px-2 py-1.5 text-sm font-semibold">
                              {category.name}
                            </div>
                            {category.subCategories.map((sub) => (
                              <SelectItem
                                key={sub.id}
                                value={sub.id}
                                className="pl-6"
                              >
                                {sub.name}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedSubCategory && (
                  <p className="text-sm text-red-500">
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
                  <p className="text-sm text-red-500">{errors.moq.message}</p>
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
                  <p className="mt-2 text-sm text-red-500">
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
                        <Controller
                          name={`specifications.${index}.key`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                {specificationTypes.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.specifications?.[index]?.key && (
                          <p className="text-sm text-red-500">
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
                          <p className="text-sm text-red-500">
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
                        {spec.availableOptions.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex gap-2">
                            <Input
                              placeholder={`Option ${optionIndex + 1}`}
                              value={option}
                              onChange={(e) =>
                                updateOption(index, optionIndex, e.target.value)
                              }
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(index, optionIndex)}
                              disabled={spec.availableOptions.length === 1}
                              type="button"
                            >
                              <Trash2 className="text-destructive h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      {errors.specifications?.[index]?.availableOptions && (
                        <p className="text-sm text-red-500">
                          {
                            errors.specifications[index]?.availableOptions
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    {spec.availableOptions.some((opt) => opt.trim() !== "") && (
                      <div className="space-y-2">
                        <Label>Default Selected Option</Label>
                        <Controller
                          name={`specifications.${index}.value`}
                          control={control}
                          render={({ field }) => (
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              {spec.availableOptions
                                .filter((opt) => opt.trim() !== "")
                                .map((option, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center space-x-2"
                                  >
                                    <RadioGroupItem
                                      value={option}
                                      id={`${spec.id}-${idx}`}
                                    />
                                    <Label
                                      htmlFor={`${spec.id}-${idx}`}
                                      className="cursor-pointer font-normal"
                                    >
                                      {option}
                                    </Label>
                                  </div>
                                ))}
                            </RadioGroup>
                          )}
                        />
                        {errors.specifications?.[index]?.value && (
                          <p className="text-sm text-red-500">
                            {errors.specifications[index]?.value?.message}
                          </p>
                        )}
                      </div>
                    )}
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
                          <p className="text-sm text-red-500">
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
                          <p className="text-sm text-red-500">
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
            <Link href="/categories">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Template"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
