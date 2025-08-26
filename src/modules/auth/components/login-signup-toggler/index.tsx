"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import routes from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    text: "Sign up",
    href: routes.SIGN_UP,
  },
  {
    text: "Sign in",
    href: routes.LOGIN,
  },
];

function LoginSignupTab() {
  const pathname = usePathname();

  return (
    <div className="border-b">
      <div className="relative -bottom-[0.2px] flex items-center">
        {links?.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={buttonVariants({
              className: cn(
                "w-1/2 rounded-none border-b-2 bg-transparent font-[family-name:var(--font-manrope-heading)]! text-lg! hover:bg-transparent",
                pathname === link.href
                  ? "border-primary text-primary font-bold"
                  : "text-brand-gray-70 border-transparent font-[300]!",
              ),
              variant: "ghost",
              size: "lg",
            })}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LoginSignupTab;
