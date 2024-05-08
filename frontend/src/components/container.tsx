import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("mx-auto max-w-screen-xl", className)}>{children}</div>
  );
};
