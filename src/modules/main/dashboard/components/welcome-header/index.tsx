import { Badge } from "@/components/ui/badge";
import Heading from "@/components/ui/heading";
import { Check, Clock } from "lucide-react";

function WelcomeHeader({ isVerified }: { isVerified?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Heading size={"h4"}>Welcome back, Damola!</Heading>
        <p className="text-xs">
          Here&apos;s what&apos;s happening with your print hub today.
        </p>
      </div>
      {isVerified ? (
        <Badge variant="secondary" className="bg-green-200 px-2 text-green-900">
          <Check />
          Verified Hub
        </Badge>
      ) : (
        <Badge variant="secondary" className="bg-blue-500 text-white">
          <Clock />
          Not Verified
        </Badge>
      )}
    </div>
  );
}

export default WelcomeHeader;
