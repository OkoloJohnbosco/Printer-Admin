import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeletonRowLoader from "@/components/ui/table-row-skeleton";
import useGetAllPayouts from "@/lib/hooks/payouts/use-get-all-payouts";
import NoRevenueCard from "../no-revenue-card";
import TransactionTableRow, {
  TransactionMobileCard,
} from "../transaction-tablerow";

function TransactionMobileSkeleton() {
  return (
    <div className="divide-y md:hidden">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TransactionTable({
  getAllPayouts,
}: {
  getAllPayouts: ReturnType<typeof useGetAllPayouts>;
}) {
  const payouts = getAllPayouts?.value?.data?.payouts || [];
  const isLoading = getAllPayouts.isLoading && !getAllPayouts?.value;

  if (isLoading) {
    return (
      <>
        <TransactionMobileSkeleton />
        <div className="hidden md:block">
          <Table className="min-w-[720px] lg:min-w-0">
            <TableHeader>
              <TableRow className="bg-foundation-gray-50 text-foundation-black-400 bg-brand-gray-40">
                <TableHead className="w-[22%] px-4 lg:px-7">
                  Date and time
                </TableHead>
                <TableHead className="w-[28%] px-4 lg:px-7">Hub</TableHead>
                <TableHead className="w-[18%] px-4 lg:px-7">Type</TableHead>
                <TableHead className="w-[12%] px-4 lg:px-7">Amount</TableHead>
                <TableHead className="w-[20%] px-4 lg:px-7">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableSkeletonRowLoader length={5} noOfRows={8} />
          </Table>
        </div>
      </>
    );
  }

  if (payouts.length === 0) {
    return (
      <div className="py-10">
        <NoRevenueCard />
      </div>
    );
  }

  return (
    <>
      <div className="divide-y md:hidden">
        {payouts.map((payout) => (
          <TransactionMobileCard key={payout.id} payout={payout} />
        ))}
      </div>

      <div className="hidden md:block">
        <Table className="lg:table-fixed">
          <TableHeader>
            <TableRow className="bg-foundation-gray-50 text-foundation-black-400 bg-brand-gray-40">
              <TableHead className="w-[22%] px-4 lg:px-7">
                Date and time
              </TableHead>
              <TableHead className="w-[28%] px-4 lg:px-7">Hub</TableHead>
              <TableHead className="w-[18%] px-4 lg:px-7">Type</TableHead>
              <TableHead className="w-[12%] px-4 lg:px-7">Amount</TableHead>
              <TableHead className="w-[20%] px-4 lg:px-7">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="page-fade-in">
            {payouts.map((payout) => (
              <TransactionTableRow key={payout.id} payout={payout} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
