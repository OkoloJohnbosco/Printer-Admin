"use client";

import useGetHubById from "@/lib/hooks/admin/use-get-hub-by-id";
import PrintHubDetailsSkeleton from "./components/hub-details-skeleton";
import HubDetailsSection from "./templates/hub-details-section";

export default function PrintHubDetailPageTamplate({
  params,
}: {
  params: { id: string };
}) {
  const getHub = useGetHubById(params.id ?? "");
  const hub = getHub?.value?.data;

  const isLoading = getHub.isLoading && !getHub?.value;
  const isError = getHub.isError && getHub?.error;
  console.log(getHub?.value?.data, "getHub");

  if (isError) {
    return <div>Error fetching hub</div>;
  }
  if (isLoading) {
    return <PrintHubDetailsSkeleton />;
  }
  if (!hub) {
    return <div>Hub not found</div>;
  }

  return <HubDetailsSection hub={hub} />;
}
