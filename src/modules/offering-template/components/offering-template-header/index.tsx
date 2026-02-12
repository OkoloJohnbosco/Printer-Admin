import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import routes from "@/routes";
import { Plus } from "lucide-react";
import Link from "next/link";

function OfferingTemplateHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1 sm:space-y-2">
        <Heading size="h4">Offering Templates</Heading>
        <p className="text-muted-foreground text-sm sm:text-base">
          Manage product offering templates for your print hub catalog
        </p>
      </div>
      <Link href={routes.TEMPLATES_NEW} className="w-full sm:w-auto">
        <Button asChild className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Offering Template
        </Button>
      </Link>
    </div>
  );
}

export default OfferingTemplateHeader;
