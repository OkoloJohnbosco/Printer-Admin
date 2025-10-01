import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "./button";

function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  const [isShown, setShow] = React.useState(false);
  return (
    <div className="relative w-full">
      <input
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-brand-placeholder selection:bg-primary selection:text-primary-foreground dark:bg-input/30 text-nm flex h-10.5 w-full min-w-0 rounded-md border border-gray-100 bg-white px-3 py-1 font-[400] transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[1px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
        type={isShown ? "text" : "password"}
      />
      <Button
        variant="ghost_gray"
        size="icon"
        className="absolute top-0.5 right-0.5 border-0 font-light text-gray-400 hover:text-gray-500"
        onClick={() => setShow((prev) => !prev)}
      >
        {isShown ? (
          <EyeOffIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}

export { PasswordInput };
