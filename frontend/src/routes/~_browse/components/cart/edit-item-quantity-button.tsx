import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";

import { LoadingDots } from "@/components/loading-dots";
import { Button } from "@/components/ui/button";

type ItemQuantityUpdateButtonProps = {
  type: "plus" | "minus";
  pending: boolean;
  handleOnClick: () => void;
};

export const ItemQuantityUpdateButton = ({
  type,
  pending,
  handleOnClick,
}: ItemQuantityUpdateButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleOnClick}
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      disabled={pending}
      className={cn("px-2", {
        "rounded-r-full": type === "plus",
        "ml-auto rounded-l-full": type === "minus",
      })}
    >
      {pending ? (
        <LoadingDots />
      ) : type === "plus" ? (
        <PlusIcon className="h-4 w-4" />
      ) : (
        <MinusIcon className="h-4 w-4" />
      )}
    </Button>
  );
};
