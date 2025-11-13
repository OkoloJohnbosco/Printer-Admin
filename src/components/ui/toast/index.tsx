"use client";

import { cn } from "@/lib/utils";
import { JSX } from "react";
import { toast as sonnerToast } from "sonner";
import { Button } from "../button";
import { Icons } from "../icons";
import { ToastProps, ToastVariant } from "./toast.types";

function Toast(props: ToastProps) {
  const { description, button, id, variant = "default" } = props;
  const { icon } = variantStyles[variant];

  return (
    <div className="flex w-[330px] items-center justify-between gap-4 rounded-2xl bg-[#282828] px-4 py-4 sm:w-[356px]">
      <div className="flex w-full flex-1 items-center">
        <div className="mr-2">{icon}</div>
        <div className="w-full flex-1">
          <p className="text-nm text-[#ffffffcc]">{description}</p>
        </div>
      </div>
      {button && (
        <Button
          variant={button?.variant ?? "toast"}
          size="sm"
          className={cn(button?.className, "px-0")}
          onClick={() => {
            if (button?.onClick) {
              button.onClick();
            }
            sonnerToast.dismiss(id);
          }}
        >
          {button.label}
        </Button>
      )}
    </div>
  );
}

function createCustomToast(variant: ToastVariant = "default") {
  return (toast: Omit<ToastProps, "id" | "variant">) => {
    return sonnerToast.custom((id) => (
      <Toast id={id} variant={variant} {...toast} />
    ));
  };
}

const variantStyles: Record<
  ToastVariant,
  { icon: JSX.Element; classes: string }
> = {
  default: {
    icon: <span>🔔</span>,
    classes: "bg-white text-gray-900",
  },
  success: {
    icon: <Icons.success />,
    classes: "bg-green-50 text-green-800",
  },
  error: {
    icon: (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
        <Icons.error />
      </span>
    ),
    classes: "bg-red-50 text-red-800",
  },
  warning: {
    icon: <span>⚠️</span>,
    classes: "bg-yellow-50 text-yellow-800",
  },
  info: {
    icon: <span>ℹ️</span>,
    classes: "bg-blue-50 text-blue-800",
  },
};

const toast = {
  show: createCustomToast(),
  success: createCustomToast("success"),
  error: createCustomToast("error"),
  warning: createCustomToast("warning"),
  info: createCustomToast("info"),
};

export default toast;
