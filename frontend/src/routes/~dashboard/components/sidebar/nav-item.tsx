import { Link, LinkOptions } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

type NavItemProps = {
  name: string;
  to: LinkOptions["to"];
  from: LinkOptions["from"];
  icon: LucideIcon;
  exact: boolean;
};

export const NavItem = ({
  name,
  to,
  icon: Icon,
  exact,
  from,
}: NavItemProps) => {
  return (
    <Hint label={name} side="right">
      <Button size="icon" variant="ghost" asChild className="">
        <Link
          to={to}
          activeProps={{ className: "bg-accent" }}
          activeOptions={{ exact }}
          from={from}
        >
          <Icon className="h-5 w-5" />
        </Link>
      </Button>
    </Hint>
  );
};
