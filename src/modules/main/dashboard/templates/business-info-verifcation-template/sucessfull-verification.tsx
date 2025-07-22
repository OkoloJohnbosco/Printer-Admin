import Heading from "@/components/ui/heading";
import { Check } from "lucide-react";

function SucessfulVerification() {
  return (
    <div className="space-y-2 text-center py-6">
      <div className="bg-brand-teal-100 mx-auto grid h-24 w-24 place-items-center rounded-full">
        <Check className="size-12 text-brand-teal-200" />
      </div>

      <Heading size="h6" className="text-center">
        Success Submitted!
      </Heading>
      <p className="text-center text-nm">We will notify you when approved</p>
    </div>
  );
}

export default SucessfulVerification;
