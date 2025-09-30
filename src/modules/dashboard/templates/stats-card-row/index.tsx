import Heading from "@/components/ui/heading";
import {
  ArrowUp,
  CheckCircle,
  CircleDollarSign,
  Info,
  Printer,
} from "lucide-react";

function StatsCardRow() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand-purple-500 grid h-12 w-12 place-items-center rounded-full">
            <Printer className="text-brand-gray-400 h-4 w-4" />
          </div>
          <div>
            <p className="text-nm">Total orders</p>
            <Heading size="h4">₦0</Heading>
          </div>
        </div>
        <div className="text-brand-green-100 flex items-center gap-0.5 text-xs">
          <ArrowUp className="size-4" />
          <span>12% from last week</span>
        </div>
      </div>

      {/* Completed jobs */}
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand-green-200 grid h-12 w-12 place-items-center rounded-full">
            <CheckCircle className="text-brand-green-300 h-4 w-4" />
          </div>
          <div>
            <p className="text-nm">Active Customers</p>
            <Heading size="h4">124</Heading>
          </div>
        </div>
        <div className="text-brand-green-100 flex items-center gap-0.5 text-xs">
          <ArrowUp className="size-4" />
          <span>8% from last week</span>
        </div>
      </div>

      {/* Monthly Revenue */}
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand-blue-100 grid h-12 w-12 place-items-center rounded-full">
            <CircleDollarSign className="text-brand-blue-200 h-4 w-4" />
          </div>
          <div>
            <p className="text-nm">Monthly Revenue</p>
            <Heading size="h4">₦300,482</Heading>
          </div>
        </div>
        <div className="text-brand-green-100 flex items-center gap-0.5 text-xs">
          <ArrowUp className="size-4" />
          <span>17% from last week</span>
        </div>
      </div>

      {/* Average Rating */}
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-brand-yellow-100 grid h-12 w-12 place-items-center rounded-full">
            <Info className="text-brand-yellow-200 h-4 w-4" />
          </div>
          <div>
            <p className="text-nm">Requires Attention</p>
            <Heading size="h4">20</Heading>
          </div>
        </div>
        <div className="text-brand-green-100 flex items-center gap-0.5 text-xs">
          <ArrowUp className="size-4" />
          <span>0.2% from last week</span>
        </div>
      </div>
    </div>
  );
}

export default StatsCardRow;
