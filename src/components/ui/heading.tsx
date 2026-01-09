import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export const headerClasses = cva([``], {
  variants: {
    size: {
      h1: ["sm:text-[56px] text-[40px] leading-[120%]"],
      h2: ["sm:text-[48px] text-[36px] leading-[120%]"],
      h3: ["sm:text-[32px] text-[24px] leading-[120%]"],
      h4: ["sm:text-[24px] text-[20px] leading-[140%]"],
      h5: ["sm:text-[20px] text-[18px] leading-[140%]"],
      h6: ["sm:text-[18px] text-[16px] leading-[140%]"],
      h7: ["sm:text-[16px] text-[14px] leading-[140%]"],
      h8: ["text-[12px] sm:text-[12px] md:text-[14px] leading-[140%]"],
      h9: ["text-[10px] sm:text-[10px] md:text-[12px] leading-[140%]"],
    },
  },
  defaultVariants: {
    size: "h3",
  },
});

export interface HeadingProps
  extends DetailedHTMLProps<
      HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >,
    VariantProps<typeof headerClasses> {
  as?: HeaderTypes;
}
type HeaderTypes = "h1" | "h2" | "h3" | "h4";

function Heading({
  children,
  size,
  as = "h2",
  style,
  className = "",
}: HeadingProps) {
  const allowedTypes = ["h1", "h2", "h3", "h4", "h5"];
  const Comp = allowedTypes.includes(as) ? as : ("h2" as const);

  const classNames = cn(headerClasses({ size }), className);
  return (
    <Comp className={classNames} style={style}>
      {children}
    </Comp>
  );
}

export default Heading;
