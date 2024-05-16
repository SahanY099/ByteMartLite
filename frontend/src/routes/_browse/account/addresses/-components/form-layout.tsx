import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { AddressFormSkeleton } from "./address-form";

type FormLayoutProps = {
  children: ReactNode;
} & (UpdateLayoutProps | AddLayoutProps);

type UpdateLayoutProps = {
  update: true;
  name: string;
};

type AddLayoutProps = {
  update: false;
  billing: boolean;
};

export const FormLayout = ({ children, ...props }: FormLayoutProps) => {
  return (
    <div className="mx-auto flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link to="/account/addresses">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {props.update ? (
            <>
              Edit <span className="mx-1 italic">{props.name}</span> Address
            </>
          ) : (
            <>Add new {props.billing ? "Billing" : "Shipping"} Address</>
          )}
        </h1>

        <Button variant="outline" size="sm" className="ml-auto hidden md:block">
          <Link to="/account/addresses">Cancel</Link>
        </Button>
      </div>
      {children}
    </div>
  );
};

export const FormLayoutSkeleton = () => {
  return (
    <div className="mx-auto flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link to="/account/addresses">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="h-8 w-64 animate-pulse rounded bg-secondary"></div>

        <Button variant="outline" size="sm" className="ml-auto hidden md:block">
          <Link to="/account/addresses">Cancel</Link>
        </Button>
      </div>
      <AddressFormSkeleton />
    </div>
  );
};
