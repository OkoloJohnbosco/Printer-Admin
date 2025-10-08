import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import routes from "@/routes";
import { Plus } from "lucide-react";
import Link from "next/link";

function OfferingTemplateHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="space-y-2">
        <Heading size="h4">Offering Templates</Heading>
        <p className="text-muted-foreground">
          Manage product offering templates for your print hub catalog
        </p>
      </div>
      <Link href={routes.TEMPLATES_NEW}>
        <Button asChild>
          <Plus className="h-4 w-4" />
          Add Offering Template
        </Button>
      </Link>
    </div>
  );
}

export default OfferingTemplateHeader;
