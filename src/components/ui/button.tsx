import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium cursor-pointer transition-[background,box-shadow,transform,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-px [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_2px_0_oklch(0.17_0.05_265/0.15),0_1px_3px_0_oklch(0.17_0.05_265/0.10),inset_0_1px_0_0_oklch(1_0_0/0.08)] hover:bg-[oklch(0.22_0.06_262)] hover:shadow-[0_6px_16px_-4px_oklch(0.17_0.05_265/0.30),0_2px_4px_0_oklch(0.17_0.05_265/0.12),inset_0_1px_0_0_oklch(1_0_0/0.10)] hover:-translate-y-[0.5px]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md",
        outline:
          "border border-border bg-background text-foreground shadow-[0_1px_2px_0_oklch(0.17_0.05_265/0.04)] hover:bg-secondary hover:border-foreground/20 hover:shadow-[0_2px_6px_-2px_oklch(0.17_0.05_265/0.08)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_1px_2px_0_oklch(0.17_0.05_265/0.03)] hover:bg-muted",
        ghost: "text-foreground hover:bg-secondary",
        link: "text-primary underline-offset-4 hover:underline rounded-md",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-full px-3.5 text-xs",
        lg: "h-11 rounded-full px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
