import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_browse/checkout/success")({
  component: Status,
});

function Status() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="animate-grow relative flex h-48 w-48 items-center justify-center">
          <div className="animate-bubble-1 absolute h-48 w-48 rounded-full bg-green-100" />
          <div className="absolute h-36 w-36 animate-ping rounded-full bg-green-200 fill-mode-forwards" />
          <div className="animate-bubble-3 absolute h-24 w-24 rounded-full bg-green-300" />
          <div className="animate-checkmark absolute flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
            <Check className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </>
  );
}
