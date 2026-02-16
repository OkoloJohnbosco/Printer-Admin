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
import useCreateProduct from "@/lib/hooks/admin/use-create-product";
import useGetProductCategories from "@/lib/hooks/admin/use-get-product-categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import SuccessModal from "./components/success-modal";

const specificationSchema = z.object({
  key: z.string().min(1, "Specification key is required"),
  label: z.string().min(1, "Display label is required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(1, "At least one option is required"),
  base: z.string().optional(),
  priceType: z.string().optional(),
});

const addonSchema = z.object({
  key: z.string().min(1, "Key is required"),
  label: z.string().min(1, "Label is required"),
  description: z.string().optional(),
});

const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  selectedCategory: z.string().min(1, "Category is required"),
  specifications: z
    .array(specificationSchema)
    .min(1, "At least one specification is required"),
  addons: z.array(addonSchema),
});

type FormData = z.infer<typeof formSchema>;

export default function NewProductSection() {
  const getProductCategories = useGetProductCategories();
  const createProduct = useCreateProduct();
  const queryClient = useQueryClient();

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
      productName: "",
      description: "",
      selectedCategory: "",
      specifications: [
        {
          key: "",
          label: "",
          options: [""],
          base: "",
          priceType: "",
        },
      ],
      addons: [],
    },
  });

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

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const addSpecificationField = () => {
    appendSpecification({
      key: "",
      label: "",
      options: [""],
      base: "",
      priceType: "",
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
    const currentValues = getValues(`specifications.${specIndex}.options`);
    const newOptions = [...currentValues, ""];
    setValue(`specifications.${specIndex}.options`, newOptions);
  };

  const removeOption = (specIndex: number, optionIndex: number) => {
    const currentValues = getValues(`specifications.${specIndex}.options`);
    if (currentValues.length > 1) {
      const newOptions = currentValues.filter((_, idx) => idx !== optionIndex);
      setValue(`specifications.${specIndex}.options`, newOptions);
    }
  };

  const onSubmit = (data: FormData) => {
    const specifications: Record<
      string,
      {
        label: string;
        options: string[];
        base?: string;
        priceType?: string;
      }
    > = {};

    data.specifications.forEach((spec) => {
      if (spec.key) {
        const specEntry: {
          label: string;
          options: string[];
          base?: string;
          priceType?: string;
        } = {
          label: spec.label,
          options: spec.options,
        };
        if (spec.base) {
          specEntry.base = spec.base;
        }
        if (spec.priceType) {
          specEntry.priceType = spec.priceType;
        }
        specifications[spec.key] = specEntry;
      }
    });

    const product = {
      name: data.productName,
      description: data.description || "",
      categoryId: data.selectedCategory,
      specifications,
      addons: data.addons.filter((addon) => addon.key && addon.label),
    };

    createProduct.mutateAsync(product).then(() => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GET_ALL_PRODUCTS],
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
            text={<span className="text-brand-gray-80">Back to Products</span>}
          />
          <div>
            <h1 className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
              Create New Product
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Define a product with specifications that print hubs can use when
              creating offerings
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
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  placeholder="e.g., Standard Business Card"
                  {...register("productName")}
                />
                {errors.productName && (
                  <p className="text-xs text-red-500">
                    {errors.productName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the product..."
                  {...register("description")}
                  rows={3}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="selectedCategory"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {getProductCategories?.value?.data?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.selectedCategory && (
                  <p className="text-xs text-red-500">
                    {errors.selectedCategory.message}
                  </p>
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
                        <Label>Key</Label>
                        <Input
                          placeholder="e.g., size, finish, material"
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
                          placeholder="e.g., Size, Finish, Material"
                          {...register(`specifications.${index}.label`)}
                        />
                        {errors.specifications?.[index]?.label && (
                          <p className="text-xs text-red-500">
                            {errors.specifications[index]?.label?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Base Option (Optional)</Label>
                        <Input
                          placeholder="e.g., A5, Standard"
                          {...register(`specifications.${index}.base`)}
                        />
                        <p className="text-muted-foreground text-xs">
                          The default option for this specification
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Price Type (Optional)</Label>
                        <Controller
                          name={`specifications.${index}.priceType`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              value={field.value || ""}
                              onValueChange={(val) =>
                                field.onChange(val === "none" ? "" : val)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="No price type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">
                                  No price type
                                </SelectItem>
                                <SelectItem value="FIXED">Fixed</SelectItem>
                                <SelectItem value="PER_UNIT">
                                  Per Unit
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <p className="text-muted-foreground text-xs">
                          How pricing applies to this specification
                        </p>
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
                        {watch(`specifications.${index}.options`)?.map(
                          (option: string, optionIndex: number) => (
                            <Fragment key={optionIndex}>
                              <div key={optionIndex} className="flex gap-2">
                                <Input
                                  placeholder={`Option ${optionIndex + 1}`}
                                  {...register(
                                    `specifications.${index}.options.${optionIndex}`,
                                  )}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeOption(index, optionIndex)
                                  }
                                  disabled={
                                    watch(`specifications.${index}.options`)
                                      ?.length === 1
                                  }
                                  type="button"
                                >
                                  <Trash2 className="text-destructive h-4 w-4" />
                                </Button>
                              </div>
                              {errors.specifications?.[index]?.options?.[
                                optionIndex
                              ] && (
                                <p className="text-xs text-red-500">
                                  {
                                    errors.specifications[index]?.options?.[
                                      optionIndex
                                    ]?.message
                                  }
                                </p>
                              )}
                            </Fragment>
                          ),
                        )}
                      </div>
                      {errors.specifications?.[index]?.options && (
                        <p className="text-xs text-red-500">
                          {errors.specifications[index]?.options?.message}
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
            <Link href="/products" className="w-full sm:w-auto">
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
              isLoading={createProduct.isPending}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>

        {/* Success Modal */}
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          onCreateAnother={handleCreateAnother}
          productName={watch("productName") || ""}
        />
      </main>
    </div>
  );
}
