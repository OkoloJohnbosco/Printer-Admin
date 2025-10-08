"use client";
import { printHubs } from "@/lib/constants";
import useGetAllHubs from "@/lib/hooks/admin/use-get-all-hubs";
import PrintHubGridCard from "../../components/print-hub-grid-card";

function PrintHubGrid({
  getAllHubs,
}: {
  getAllHubs: ReturnType<typeof useGetAllHubs>;
}) {
  console.log(getAllHubs);

  return (
    <div className="print-hub-grid page-fade-in border-t pt-5">
      {printHubs.map((hub) => (
        <PrintHubGridCard key={hub.id} hub={hub} />
      ))}
    </div>
  );
}

export default PrintHubGrid;
