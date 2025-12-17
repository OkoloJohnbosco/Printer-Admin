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

export const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
    jobId: "TRX-8723941",
    customer: "John Doe",
    jobDetails: "Job Details",
    dueDate: "2025-01-01",
    status: "Active",
    progress: 77,
    actions: "Actions",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
    jobId: "TRX-8723941",
    customer: "John Doe",
    jobDetails: "Job Details",
    dueDate: "2025-01-01",
    status: "Active",
    progress: 77,
    actions: "Actions",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
    jobId: "TRX-8723941",
    customer: "John Doe",
    jobDetails: "Job Details",
    dueDate: "2025-01-01",
    status: "Active",
    progress: 77,
    actions: "Actions",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
    jobId: "TRX-8723941",
    customer: "John Doe",
    jobDetails: "Job Details",
    dueDate: "2025-01-01",
    status: "Active",
    progress: 77,
    actions: "Actions",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
    jobId: "TRX-8723941",
    customer: "John Doe",
    jobDetails: "Job Details",
    dueDate: "2025-01-01",
    status: "Active",
    progress: 77,
    actions: "Actions",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
    jobId: "TRX-8723941",
    customer: "John Doe",
    jobDetails: "Job Details",
    dueDate: "2025-01-01",
    status: "Active",
    progress: 44,
    actions: "Actions",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
    jobId: "TRX-8723941",
    customer: "John Doe",
    jobDetails: "Job Details",
    dueDate: "2025-01-01",
    status: "Active",
    progress: 55,
    actions: "Actions",
  },
];

export default function TransactionTable({
  getAllPayouts,
}: {
  getAllPayouts: ReturnType<typeof useGetAllPayouts>;
}) {
  const payouts = getAllPayouts?.value?.data?.payouts || [];
  const isLoading = getAllPayouts.isLoading && !getAllPayouts?.value;

  const renderTableBody = () => {
    if (isLoading) return <TableSkeletonRowLoader length={6} noOfRows={8} />;

    if (payouts?.length === 0) {
      return (
        <TableBody className="page-fade-in">
          <TableRow className="hover:bg-transparent">
            <td colSpan={6} className="py-10">
              <NoRevenueCard />
            </td>
          </TableRow>
        </TableBody>
      );
    }

    return (
      // <TableBody className="page-fade-in">
      //   {payouts?.map((order) => (
      //     <OrderTableRow key={order.id} order={order} />
      //   ))}
      // </TableBody>
      <TableBody>
        {invoices.map((invoice) => (
          <TransactionTableRow key={invoice.invoice} invoice={invoice} />
        ))}
      </TableBody>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-foundation-gray-50 text-foundation-black-400 bg-brand-gray-40">
          <TableHead className="px-7">Date and time</TableHead>
          <TableHead className="px-7">Transaction ID</TableHead>
          <TableHead className="px-7">Description</TableHead>
          <TableHead className="px-7">Amount</TableHead>
          <TableHead className="px-7">Status</TableHead>
          <TableHead className="px-7 text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <>{renderTableBody()}</>
    </Table>
  );
}
