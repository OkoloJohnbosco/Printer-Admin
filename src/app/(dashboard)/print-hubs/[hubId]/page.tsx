import PrintHubDetailPageTamplate from "@/modules/hub-management/hub-details";

export default function PrintHubsPage({
  params,
}: {
  params: { hubId: string };
}) {
  return <PrintHubDetailPageTamplate params={{ id: params.hubId }} />;
}
