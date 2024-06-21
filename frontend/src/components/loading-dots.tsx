import { cn } from "@/lib/utils";

const dotClassName =
  "mx-[1px] inline-block h-1 w-1 animate-bounce rounded-md bg-primary";

export const LoadingDots = ({ className }: { className?: string }) => {
  return (
    <span className="mx-2 inline-flex items-center">
      <span
        className={cn(dotClassName, "[animation-delay:-0.3s]", className)}
      />
      <span
        className={cn(dotClassName, "[animation-delay:-0.15s]", className)}
      />
      <span className={cn(dotClassName, className)} />
    </span>
  );
};
