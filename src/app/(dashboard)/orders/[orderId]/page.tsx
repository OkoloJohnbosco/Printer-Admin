import OrderDetailPageTemplate from "@/modules/order-management/order-details";

async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return <OrderDetailPageTemplate params={{ id: orderId }} />;
}

export default OrderDetailPage;
