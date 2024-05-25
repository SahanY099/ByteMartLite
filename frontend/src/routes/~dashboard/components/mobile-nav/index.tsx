import { PanelLeft } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavItem } from "./nav-item";

import { links } from "../nav-links";

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="flex flex-col gap-6 text-lg font-medium">
          <Logo size="small" to={"/dashboard"} />
          {links.map((link) => (
            <NavItem {...link} key={link.name} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
