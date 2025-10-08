"use client";
import Heading from "@/components/ui/heading";
import useGetAllHubs from "@/lib/hooks/admin/use-get-all-hubs";
import PrintHubGridCard from "../../components/print-hub-grid-card";
import { PrintHubGridSkeletons } from "../../components/print-hub-grid-card-skeleton";

function PrintHubGrid({
  getAllHubs,
}: {
  getAllHubs: ReturnType<typeof useGetAllHubs>;
}) {
  console.log(getAllHubs);

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
        <div className="print-hub-grid page-fade-in border-t py-10 text-center">
          <Heading>No print hubs found</Heading>
        </div>
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
