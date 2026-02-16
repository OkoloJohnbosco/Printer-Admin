import EditProductPageTemplate from "@/modules/edit-product";

async function EditProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <EditProductPageTemplate productId={productId} />;
}

export default EditProductDetailsPage;
