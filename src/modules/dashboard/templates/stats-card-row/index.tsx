import Heading from "@/components/ui/heading";
import {
  ArrowUp,
  CircleDollarSign,
  ShoppingCart,
  Users,
  XCircle,
} from "lucide-react";

function StatsCardRow() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Orders */}
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand-purple-500 grid h-12 w-12 place-items-center rounded-full">
            <ShoppingCart className="text-brand-gray-400 h-4 w-4" />
          </div>
          <div>
            <p className="text-nm">Total Orders</p>
            <Heading size="h4">1,234</Heading>
          </div>
        </div>
        <div className="text-brand-green-100 flex items-center gap-0.5 text-xs">
          <ArrowUp className="size-4" />
          <span>12% from last week</span>
        </div>
      </div>

      {/* Total Customers */}
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand-green-200 grid h-12 w-12 place-items-center rounded-full">
            <Users className="text-brand-green-300 h-4 w-4" />
          </div>
          <div>
            <p className="text-nm">Total Customers</p>
            <Heading size="h4">8,456</Heading>
          </div>
        </div>
        <div className="text-brand-green-100 flex items-center gap-0.5 text-xs">
          <ArrowUp className="size-4" />
          <span>8% from last week</span>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand-blue-100 grid h-12 w-12 place-items-center rounded-full">
            <CircleDollarSign className="text-brand-blue-200 h-4 w-4" />
          </div>
          <div>
            <p className="text-nm">Total Revenue</p>
            <Heading size="h4">₦2,450,000</Heading>
          </div>
        </div>
        <div className="text-brand-green-100 flex items-center gap-0.5 text-xs">
          <ArrowUp className="size-4" />
          <span>17% from last week</span>
        </div>
      </div>

      {/* Rejected Orders */}
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand-yellow-100 grid h-12 w-12 place-items-center rounded-full">
            <XCircle className="text-brand-yellow-200 h-4 w-4" />
          </div>
          <div>
            <p className="text-nm">Rejected Orders</p>
            <Heading size="h4">45</Heading>
          </div>
        </div>
        <div className="text-brand-green-100 flex items-center gap-0.5 text-xs">
          <ArrowUp className="size-4" />
          <span>3.6% rejection rate</span>
        </div>
      </div>
    </div>
  );
}

export default StatsCardRow;
