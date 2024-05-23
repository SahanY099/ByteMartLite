import { LinkOptions } from "@tanstack/react-router";
import { Inbox, Layers, LucideIcon, Package } from "lucide-react";

type Link = {
  name: string;
  to: LinkOptions["to"];
  from: LinkOptions["from"];
  icon: LucideIcon;
  exact: boolean;
};

export const links = [
  {
    name: "Dashboard",
    to: "/dashboard",
    from: "/dashboard",
    icon: Layers,
    exact: true,
  },
  {
    name: "Products",
    to: "/dashboard/products",
    from: "/dashboard/products",
    icon: Package,
    exact: false,
  },
  {
    name: "Orders",
    to: "/",
    from: "/",
    icon: Inbox,
    exact: false,
  },
] as Link[];
