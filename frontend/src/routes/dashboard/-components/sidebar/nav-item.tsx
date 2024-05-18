import { Link, LinkOptions } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

type NavItemProps = {
  name: string;
  href: LinkOptions["to"];
  icon: LucideIcon;
};

export const NavItem = ({ name, href, icon: Icon }: NavItemProps) => {
  return (
    <Hint label={name} side="right">
      <Button size="icon" variant="ghost" asChild className="">
        <Link
          to={href}
          activeProps={{ className: "bg-accent" }}
          activeOptions={{ exact: false }}
        >
          <Icon className="h-5 w-5" />
        </Link>
      </Button>
    </Hint>
  );
};
