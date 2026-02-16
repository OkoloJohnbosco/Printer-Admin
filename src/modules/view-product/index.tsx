"use client";

import BackButton from "@/components/ui/back-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGetProductCategories from "@/lib/hooks/admin/use-get-product-categories";
import useGetProductById from "@/lib/hooks/admin/use-get-product-by-id";
import routes from "@/routes";
import { Edit, Package, Plus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import NoProductFound from "./components/no-product-found";
import ViewProductSkeleton from "./templates/view-product-skeleton";

interface ViewProductPageTemplateProps {
  productId: string;
}

export default function ViewProductPageTemplate({
  productId,
}: ViewProductPageTemplateProps) {
  const router = useRouter();
  const getProduct = useGetProductById(productId);
  const getCategories = useGetProductCategories();

  const product = getProduct?.value?.data;
  const isLoading = getProduct.isLoading && !getProduct?.value;

  const category = getCategories?.value?.data?.find(
    (cat) => cat.id === product?.categoryId,
  );

  const handleEditProduct = () => {
    router.push(`${routes.PRODUCTS}/${productId}/edit`);
  };

  if (isLoading) {
    return <ViewProductSkeleton />;
  }

  if (!product) {
    return <NoProductFound />;
  }

  const specificationEntries = Object.entries(product.specifications || {});

  return (
    <div className="page-fade-in min-h-[calc(100vh-96px)] sm:min-h-[calc(100vh-120px)]">
      <main className="container mx-auto space-y-6 py-6">
        {/* Header */}
        <div className="space-y-4">
          <BackButton
            text={<span className="text-brand-gray-80">Back to Products</span>}
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{product.name}</h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                View and manage product details
              </p>
            </div>
            <Button
              onClick={handleEditProduct}
              size="lg"
              className="w-full sm:w-auto"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
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
                  Product Name
                </label>
                <p className="text-lg font-medium">{product.name}</p>
              </div>

              <Separator />

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  Description
                </label>
                <p className="text-sm">
                  {product.description || "No description"}
                </p>
              </div>

              <Separator />

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  Category
                </label>
                <p className="text-lg font-medium">
                  {category?.name || product.categoryId}
                </p>
              </div>

              <Separator />

              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  Created Date
                </label>
                <p className="text-sm">
                  {new Date(product.createdAt).toLocaleDateString("en-US", {
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
                  {specificationEntries.map(([key, spec]) => (
                    <div key={key} className="space-y-3">
                      <div>
                        <h4 className="font-medium">{spec.label}</h4>
                        <p className="text-muted-foreground text-sm">
                          {spec.options?.length || 0} option(s) available
                          {spec.priceType && (
                            <span className="ml-2">
                              &middot;{" "}
                              {spec.priceType === "PER_UNIT"
                                ? "Per Unit"
                                : "Fixed"}{" "}
                              pricing
                            </span>
                          )}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {spec.options?.slice(0, 6).map((option, index) => (
                          <Badge
                            key={index}
                            variant={
                              spec.base === option ? "default" : "secondary"
                            }
                          >
                            {option}
                            {spec.base === option && " (default)"}
                          </Badge>
                        ))}
                        {spec.options && spec.options.length > 6 && (
                          <Badge variant="outline">
                            +{spec.options.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  <Settings className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>No specifications defined for this product</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add-ons */}
          <Card className="shadow-none lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add-ons ({product.addons?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.addons && product.addons.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {product.addons.map((addon, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">{addon.label}</h4>
                        {addon.description && (
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
                  <p>No add-ons defined for this product</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
