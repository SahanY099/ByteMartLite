import { Link, ToPathOption } from "@tanstack/react-router";

import { LogoIcon } from "./logo-icon";

type LogoProps = {
  to?: ToPathOption;
  className?: string;
};

export const Logo = ({ to = "/", className }: LogoProps) => {
  return (
    <Link to={to} className={className}>
      <div className="flex items-center gap-2 transition hover:opacity-75">
        <LogoIcon />
        <div className="block">
          <p className="text-lg font-semibold leading-tight">ByteMart</p>
          <p className="text-sm leading-tight text-muted-foreground">
            Let&apos;s buy
          </p>
        </div>
      </div>
    </Link>
  );
};
