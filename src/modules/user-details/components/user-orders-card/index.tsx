import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingBag } from "lucide-react";

interface Order {
  id: string;
  productName: string;
  date: string;
  status: string;
  total: number;
}

interface UserOrdersCardProps {
  orders?: Order[];
}

export default function UserOrdersCard({ orders }: UserOrdersCardProps) {
  return (
    <Card className="@container/card shadow-none">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {orders && orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.slice(0, 5).map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">
                    {order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${order.total.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            icon={ShoppingBag}
            title="No Orders Yet"
            description="This user hasn't placed any orders. Orders will appear here once they make a purchase."
            className="border-0 py-12"
          />
        )}
      </CardContent>
    </Card>
  );
}
