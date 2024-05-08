import { ReloadIcon } from "@radix-ui/react-icons";
import { forwardRef } from "react";

import { Button, ButtonProps } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ children, loading, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        disabled={loading}
        className={cn("w-full justify-center", className)}
      >
        {children}
        {loading && <ReloadIcon className="ml-4 animate-spin" />}
      </Button>
    );
  },
);
