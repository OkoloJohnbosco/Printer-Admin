import { NairaIcon } from "@/components/ui/icons";
import Heading from "@/components/ui/heading";
import { Calendar, Clock, Wallet } from "lucide-react";

function RevenueStatsCardRow() {
  return (
    <div className="notification-grid grid">
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-brand-gray-200 font-bold">Total Earnings</p>
          <div className="bg-brand-purple-500 grid h-8 w-8 place-items-center rounded-full">
            <NairaIcon className="text-brand-gray-400 h-4 w-4" />
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <Heading size="h4" className="font-bold">
            ₦0.00
          </Heading>
          <span>Start earning by publishing your print jobs</span>
        </div>
      </div>

      {/* Available Balance */}
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-brand-gray-200 font-bold">Available Balance</p>
          <div className="bg-brand-green-200 grid h-8 w-8 place-items-center rounded-full">
            <Wallet className="text-brand-green-300 h-4 w-4" />
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <Heading size="h4" className="font-bold">
            ₦0.00
          </Heading>
          <span>Complete jobs to earn withdrawable balance</span>
        </div>
      </div>

      {/* Pending Earning */}
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-brand-gray-200 font-bold">Pending Earning</p>
          <div className="bg-brand-yellow-100 grid h-8 w-8 place-items-center rounded-full">
            <Clock className="text-brand-yellow-200 h-4 w-4" />
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <Heading size="h4" className="font-bold">
            ₦0.00
          </Heading>
          <span>No pending earnings yet</span>
        </div>
      </div>

      {/* This Month Earning */}
      <div className="space-y-4 rounded-lg bg-white px-4 py-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-brand-gray-200 font-bold">This Month</p>
          <div className="bg-brand-blue-100 grid h-8 w-8 place-items-center rounded-full">
            <Calendar className="text-brand-blue-200 h-4 w-4" />
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <Heading size="h4" className="font-bold">
            ₦0.00
          </Heading>
          <span>May 2025 - Your first month</span>
        </div>
      </div>
    </div>
  );
}

export default RevenueStatsCardRow;
