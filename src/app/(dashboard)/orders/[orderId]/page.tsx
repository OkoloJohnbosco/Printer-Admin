import OrderDetailPageTemplate from "@/modules/order-management/order-details";

function OrderDetailPage({ params }: { params: { orderId: string } }) {
  return <OrderDetailPageTemplate params={{ id: params.orderId }} />;
}

export default OrderDetailPage;
