import { Button } from "@/components/ui/button";
import routes from "@/routes";
import Link from "next/link";

function NoProductFound() {
  return (
    <div className="page-fade-in flex min-h-[calc(100vh-96px)] items-center justify-center sm:min-h-[calc(100vh-120px)]">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-semibold">Product Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The product you&apos;re looking for doesn&apos;t exist or may have
          been deleted.
        </p>
        <Link href={routes.PRODUCTS}>
          <Button>Back to Products</Button>
        </Link>
      </div>
    </div>
  );
}

export default NoProductFound;
