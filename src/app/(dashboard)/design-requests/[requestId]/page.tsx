import DesignRequestDetailPageTemplate from "@/modules/design-requests/design-request-details";

function DesignRequestDetailPage({
  params,
}: {
  params: { requestId: string };
}) {
  return <DesignRequestDetailPageTemplate params={{ id: params.requestId }} />;
}

export default DesignRequestDetailPage;
