import { Button } from "@/components/ui/button";
import routes from "@/routes";
import Link from "next/link";

function NoTemplateFound() {
  return (
    <div className="page-fade-in flex min-h-[calc(100vh_-_96px)] items-center justify-center sm:min-h-[calc(100vh_-_120px)]">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-semibold">Template Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The template you&apos;re looking for doesn&apos;t exist or may have
          been deleted.
        </p>
        <Link href={routes.TEMPLATES}>
          <Button>Back to Templates</Button>
        </Link>
      </div>
    </div>
  );
}

export default NoTemplateFound;
