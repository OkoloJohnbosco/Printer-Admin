import { cn } from "@/lib/utils";
import Image from "next/image";

function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex w-full items-center justify-center py-10", className)}
    >
      <div className="relative w-fit">
        <div className="loader w-[130px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src="/logo.svg" alt="Printa logo" width={120} height={120} />
        </div>
      </div>
    </div>
  );
}

export default Loader;
