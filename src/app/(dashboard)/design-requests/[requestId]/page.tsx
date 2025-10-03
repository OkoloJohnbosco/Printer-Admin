import DesignRequestDetailPageTemplate from "@/modules/design-requests/design-request-details";

async function DesignRequestDetailPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = await params;
  return <DesignRequestDetailPageTemplate params={{ id: requestId }} />;
}

export default DesignRequestDetailPage;
