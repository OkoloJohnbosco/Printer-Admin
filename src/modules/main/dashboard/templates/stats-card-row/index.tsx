import Heading from "@/components/ui/heading";
import {
  ArrowUp,
  CheckCircle,
  CircleDollarSign,
  Printer,
  Star,
} from "lucide-react";

function StatsCardRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="px-4 py-6 space-y-4 bg-white rounded-lg">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 grid place-items-center bg-brand-purple-500 rounded-full">
            <Printer className="h-4 w-4 text-brand-gray-400" />
          </div>
          <div>
            <p className="text-nm">Active Jobs</p>
            <Heading size="h4">₦0</Heading>
          </div>
        </div>
        <div className="flex items-center gap-0.5 text-xs text-brand-green-100">
          <ArrowUp className="size-4" />
          <span>12% from last week</span>
        </div>
      </div>

      {/* Completed jobs */}
      <div className="px-4 py-6 space-y-4 bg-white rounded-lg">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 grid place-items-center bg-brand-green-200 rounded-full">
            <CheckCircle className="h-4 w-4 text-brand-green-300" />
          </div>
          <div>
            <p className="text-nm">Completed Jobs</p>
            <Heading size="h4">124</Heading>
          </div>
        </div>
        <div className="flex items-center gap-0.5 text-xs text-brand-green-100">
          <ArrowUp className="size-4" />
          <span>8% from last week</span>
        </div>
      </div>

      {/* Monthly Revenue */}
      <div className="px-4 py-6 space-y-4 bg-white rounded-lg">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 grid place-items-center bg-brand-blue-100 rounded-full">
            <CircleDollarSign className="h-4 w-4 text-brand-blue-200" />
          </div>
          <div>
            <p className="text-nm">Monthly Revenue</p>
            <Heading size="h4">₦300,482</Heading>
          </div>
        </div>
        <div className="flex items-center gap-0.5 text-xs text-brand-green-100">
          <ArrowUp className="size-4" />
          <span>17% from last week</span>
        </div>
      </div>

      {/* Average Rating */}
      <div className="px-4 py-6 space-y-4 bg-white rounded-lg">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 grid place-items-center bg-brand-yellow-100 rounded-full">
            <Star className="h-4 w-4 text-brand-yellow-200" />
          </div>
          <div>
            <p className="text-nm">Average Rating</p>
            <Heading size="h4">4.8/5</Heading>
          </div>
        </div>
        <div className="flex items-center gap-0.5 text-xs text-brand-green-100">
          <ArrowUp className="size-4" />
          <span>0.2% from last week</span>
        </div>
      </div>
    </div>
  );
}

export default StatsCardRow;
