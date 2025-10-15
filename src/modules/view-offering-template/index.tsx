"use client";

import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGetProductSubCategories from "@/lib/hooks/admin/use-get-all-product-sub-categories";
import useGetProductTemplateById from "@/lib/hooks/admin/use-get-product-template-by-id";
import routes from "@/routes";
import { Edit, Package, Plus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import NoTemplateFound from "./components/no-template-found";
import ViewTemplateSkeleton from "./templates/view-template-skeleton";

interface ViewOfferingTemplatePageTemplateProps {
  templateId: string;
}

export default function ViewOfferingTemplatePageTemplate({
  templateId,
}: ViewOfferingTemplatePageTemplateProps) {
  const router = useRouter();
  const getTemplate = useGetProductTemplateById(templateId);
  const getSubCategories = useGetProductSubCategories();

  const template = getTemplate?.value?.data;
  const isLoading = getTemplate.isLoading && !getTemplate?.value;
  console.log({ template });
  // Find the subcategory name
  const subCategory = getSubCategories?.value?.data?.find(
    (sub) => sub.id === template?.subCategoryId,
  );

  const handleEditTemplate = () => {
    router.push(`${routes.TEMPLATES}/${templateId}/edit`);
  };

  if (isLoading) {
    return <ViewTemplateSkeleton />;
  }

  if (!template) {
    return <NoTemplateFound />;
  }

  // Extract specification entries (excluding MOQ)
  const specificationEntries = Object.entries(
    template.specifications || {},
  ).filter(
    ([key, value]) => key !== "moq" && Array.isArray(value) && value.length > 0,
  );

  return (
    <div className="page-fade-in min-h-[calc(100vh_-_96px)] sm:min-h-[calc(100vh_-_120px)]">
      <main className="container mx-auto space-y-6 py-6">
        {/* Header */}
        <div className="space-y-4">
          <BackButton
            text={
              <span className="text-brand-gray-80">
                Back to Offering Templates
              </span>
            }
          />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{template.name}</h1>
              <p className="text-muted-foreground">
                View and manage template details
              </p>
            </div>
            <Button onClick={handleEditTemplate} size="lg">
              <Edit className="mr-2 h-4 w-4" />
              Edit Template
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Basic Information */}
          <Card className="shadow-none lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  Template Name
                </label>
                <p className="text-lg font-medium">{template.name}</p>
              </div>

              <Separator />

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  Sub-Category
                </label>
                <p className="text-lg font-medium">
                  {subCategory?.name || template.subCategoryId}
                </p>
              </div>

              <Separator />

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  Minimum Order Quantity (MOQ)
                </label>
                <p className="text-lg font-medium">
                  {template.specifications?.moq || "Not specified"}
                </p>
              </div>

              <Separator />

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  Created Date
                </label>
                <p className="text-sm">
                  {new Date(template.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card className="shadow-none lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Specifications ({specificationEntries.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {specificationEntries.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {specificationEntries.map(([key, options]) => (
                    <div key={key} className="space-y-3">
                      <div>
                        <h4 className="font-medium capitalize">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {Array.isArray(options) ? options.length : 0}{" "}
                          option(s) available
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(options) &&
                          options.slice(0, 6).map((option, index) => (
                            <Badge key={index} variant="secondary">
                              {option}
                            </Badge>
                          ))}
                        {Array.isArray(options) && options.length > 6 && (
                          <Badge variant="outline">
                            +{options.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  <Settings className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>No specifications defined for this template</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add-ons */}
          <Card className="shadow-none lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add-ons ({template.addons?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {template.addons && template.addons.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {template.addons.map((addon, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">
                          {typeof addon === "string" ? addon : addon.label}
                        </h4>
                        {typeof addon === "object" && addon.description && (
                          <p className="text-muted-foreground text-sm">
                            {addon.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  <Plus className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>No add-ons defined for this template</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
