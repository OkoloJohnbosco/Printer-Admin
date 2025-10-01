import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { printHubs } from "@/lib/constants";
import PrintHubTableRow from "../printhub-tablerow";

function PrintHubTable() {
  return (
    <div className="border-border page-fade-in rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Active Orders</TableHead>
            <TableHead>Completed</TableHead>
            <TableHead>Avg Time</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {printHubs.map((printHub) => (
            <PrintHubTableRow key={printHub.id} printHub={printHub} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PrintHubTable;
