import Heading from "@/components/ui/heading";
import { Calendar, CircleDollarSign, Clock, Wallet } from "lucide-react";

function RevenueStatsCardRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="px-4 py-6 space-y-4 bg-white rounded-lg">
        <div className="flex items-center gap-4 justify-between">
          <p className="font-bold text-brand-gray-200">Total Earnings</p>
          <div className="h-8 w-8 grid place-items-center bg-brand-purple-500 rounded-full">
            <CircleDollarSign className="h-4 w-4 text-brand-gray-400" />
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <Heading size="h4" className="font-[700]">
            ₦0.00
          </Heading>
          <span>Start earning by publishing your print jobs</span>
        </div>
      </div>

      {/* Available Balance */}
      <div className="px-4 py-6 space-y-4 bg-white rounded-lg">
        <div className="flex items-center gap-4 justify-between">
          <p className="font-bold text-brand-gray-200">Available Balance</p>
          <div className="h-8 w-8 grid place-items-center bg-brand-green-200 rounded-full">
            <Wallet className="h-4 w-4 text-brand-green-300" />
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <Heading size="h4" className="font-[700]">
            ₦0.00
          </Heading>
          <span>Complete jobs to earn withdrawable balance</span>
        </div>
      </div>

      {/* Pending Earning */}
      <div className="px-4 py-6 space-y-4 bg-white rounded-lg">
        <div className="flex items-center gap-4 justify-between">
          <p className="font-bold text-brand-gray-200">Pending Earning</p>
          <div className="h-8 w-8 grid place-items-center bg-brand-yellow-100 rounded-full">
            <Clock className="h-4 w-4 text-brand-yellow-200" />
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <Heading size="h4" className="font-[700]">
            ₦0.00
          </Heading>
          <span>No pending earnings yet</span>
        </div>
      </div>

      {/* This Month Earning */}
      <div className="px-4 py-6 space-y-4 bg-white rounded-lg">
        <div className="flex items-center gap-4 justify-between">
          <p className="font-bold text-brand-gray-200">This Month</p>
          <div className="h-8 w-8 grid place-items-center bg-brand-blue-100 rounded-full">
            <Calendar className="h-4 w-4 text-brand-blue-200" />
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <Heading size="h4" className="font-[700]">
            ₦0.00
          </Heading>
          <span>May 2025 - Your first month</span>
        </div>
      </div>
    </div>
  );
}

export default RevenueStatsCardRow;
