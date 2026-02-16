import ViewProductPageTemplate from "@/modules/view-product";

async function ViewProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  return <ViewProductPageTemplate productId={productId} />;
}

export default ViewProductDetailsPage;
