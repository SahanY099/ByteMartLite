import { Link, LinkOptions } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

type NavItemProps = {
  name: string;
  to: LinkOptions["to"];
  icon: LucideIcon;
};

export const NavItem = ({ name, to, icon: Icon }: NavItemProps) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
    >
      <Icon className="h-5 w-5" />
      {name}
    </Link>
  );
};
