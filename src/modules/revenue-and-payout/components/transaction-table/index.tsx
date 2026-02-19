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
import TransactionTableRow from "../transaction-tablerow";

export default function TransactionTable({
  getAllPayouts,
}: {
  getAllPayouts: ReturnType<typeof useGetAllPayouts>;
}) {
  const payouts = getAllPayouts?.value?.data?.payouts || [];
  const isLoading = getAllPayouts.isLoading && !getAllPayouts?.value;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeletonRowLoader length={5} noOfRows={8} />;

    if (payouts?.length === 0) {
      return (
        <TableBody className="page-fade-in">
          <TableRow className="hover:bg-transparent">
            <td colSpan={5} className="py-10">
              <NoRevenueCard />
            </td>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody className="page-fade-in">
        {payouts?.map((payout) => (
          <TransactionTableRow key={payout.id} payout={payout} />
        ))}
      </TableBody>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-foundation-gray-50 text-foundation-black-400 bg-brand-gray-40">
          <TableHead className="px-7">Date and time</TableHead>
          <TableHead className="px-7">Hub</TableHead>
          <TableHead className="px-7">Type</TableHead>
          <TableHead className="px-7">Amount</TableHead>
          <TableHead className="px-7">Status</TableHead>
        </TableRow>
      </TableHeader>
      <>{renderTableBody()}</>
    </Table>
  );
}
