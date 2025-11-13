import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "../button";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

export interface ToastProps {
  id: string | number;
  description: string;
  variant?: ToastVariant;
  button?: {
    label: string;
    variant?: ButtonVariant;
    onClick?: () => void;
    className?: string;
  };
}

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";
