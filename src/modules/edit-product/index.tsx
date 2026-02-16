"use client";

import useGetProductCategories from "@/lib/hooks/admin/use-get-product-categories";
import useGetProductById from "@/lib/hooks/admin/use-get-product-by-id";
import NoProductFound from "../view-product/components/no-product-found";
import EditProductSkeleton from "./components/edit-product-skeleton";
import EditProductSection from "./templates/edit-product-section";

interface EditProductPageTemplateProps {
  productId: string;
}

export default function EditProductPageTemplate({
  productId,
}: EditProductPageTemplateProps) {
  const getProduct = useGetProductById(productId);
  const getProductCategories = useGetProductCategories();

  const product = getProduct?.value?.data;
  const categories = getProductCategories?.value?.data;
  const isLoading =
    (getProduct.isLoading && !getProduct?.value) ||
    (getProductCategories.isLoading && !getProductCategories?.value);

  if (isLoading) {
    return <EditProductSkeleton />;
  }

  if (!product) {
    return <NoProductFound />;
  }

  return (
    <EditProductSection
      product={product}
      categories={categories || []}
      productId={productId}
    />
  );
}
