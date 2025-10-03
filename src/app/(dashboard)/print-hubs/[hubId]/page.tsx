import PrintHubDetailPageTamplate from "@/modules/hub-management/hub-details";

export default async function PrintHubsPage({
  params,
}: {
  params: Promise<{ hubId: string }>;
}) {
  const { hubId } = await params;
  return <PrintHubDetailPageTamplate params={{ id: hubId }} />;
}
