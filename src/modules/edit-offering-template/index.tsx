"use client";

import useGetProductSubCategories, {
  ProductSubCategory,
} from "@/lib/hooks/admin/use-get-all-product-sub-categories";
import { ProductTemplate } from "@/lib/hooks/admin/use-get-all-product-templates";
import useGetProductTemplateById from "@/lib/hooks/admin/use-get-product-template-by-id";
import NoTemplateFound from "../view-offering-template/components/no-template-found";
import EditTemplateSkeleton from "./components/edit-template-skeleton";
import EditOfferingTemplateSection from "./templates/edit-offering-section";

interface EditOfferingTemplatePageTemplateProps {
  templateId: string;
}

export default function EditOfferingTemplatePageTemplate({
  templateId,
}: EditOfferingTemplatePageTemplateProps) {
  const getTemplate = useGetProductTemplateById(templateId);
  const getProductSubCategories = useGetProductSubCategories();

  const template = getTemplate?.value?.data;
  const subCategories = getProductSubCategories?.value?.data;
  const isLoading =
    (getTemplate.isLoading && !getTemplate?.value) ||
    (getProductSubCategories.isLoading && !getProductSubCategories?.value);

  // Available specification types

  if (isLoading) {
    return <EditTemplateSkeleton />;
  }

  if (!template) {
    return <NoTemplateFound />;
  }

  return (
    <EditOfferingTemplateSection
      template={template as unknown as ProductTemplate}
      subCategories={subCategories as unknown as ProductSubCategory[]}
      templateId={templateId}
    />
  );
}
