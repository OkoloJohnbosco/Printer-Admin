import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";

function PortfolioHeader() {
  return (
    <div className="flex items-center flex-wrap gap-4 justify-between">
      <div>
        <Heading size={"h4"}>Portfolio Management</Heading>
        <p className="text-nm">
          Showcase your best work and manage your print shop portfolio
        </p>
      </div>
      <Button>
        <Plus /> Add New Work
      </Button>
    </div>
  );
}

export default PortfolioHeader;
