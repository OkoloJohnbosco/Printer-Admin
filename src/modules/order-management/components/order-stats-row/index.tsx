import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Package, XCircle } from "lucide-react";

const stats = [
  { title: "Total Orders", value: "1,234", icon: Package, change: "+12%" },
  { title: "Pending Orders", value: "156", icon: Clock, change: "+5%" },
  { title: "Rejected Orders", value: "45", icon: XCircle, change: "-8%" },
  {
    title: "Completed Orders",
    value: "1,033",
    icon: CheckCircle,
    change: "+15%",
  },
];

function OrderStatsRow() {
  return (
    <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="@container/card border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="flex size-9 items-center justify-center rounded-full bg-green-600/10">
              <stat.icon className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-success text-xs text-green-500">
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default OrderStatsRow;
