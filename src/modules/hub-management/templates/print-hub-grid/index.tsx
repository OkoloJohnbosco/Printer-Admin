"use client";
import EmptyState from "@/components/ui/empty-state";
import useGetAllHubs from "@/lib/hooks/admin/use-get-all-hubs";
import { Printer } from "lucide-react";
import PrintHubGridCard from "../../components/print-hub-grid-card";
import { PrintHubGridSkeletons } from "../../components/print-hub-grid-card-skeleton";

function PrintHubGrid({
  getAllHubs,
}: {
  getAllHubs: ReturnType<typeof useGetAllHubs>;
}) {
  const isLoading = getAllHubs.isLoading && !getAllHubs?.value;

  const renderGridBody = () => {
    if (isLoading)
      return (
        <div className="print-hub-grid page-fade-in border-t pt-5">
          <PrintHubGridSkeletons />
        </div>
      );

    if (getAllHubs?.value?.data?.hubs?.length === 0)
      return (
        <EmptyState
          icon={Printer}
          title="No Print Hubs Found"
          description="There are currently no print hubs matching your filters. Try adjusting your search criteria or add a new hub to get started."
        />
      );

    return (
      <div className="print-hub-grid page-fade-in border-t pt-5">
        {getAllHubs?.value?.data?.hubs?.map((printHub) => (
          <PrintHubGridCard key={printHub.userId} hub={printHub} />
        ))}
      </div>
    );
  };
  return (
    <div className="">
      <>{renderGridBody()}</>
    </div>
  );
}

export default PrintHubGrid;
