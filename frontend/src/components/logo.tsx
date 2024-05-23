import { Link, LinkOptions } from "@tanstack/react-router";

import { LogoIcon } from "./logo-icon";

import { cn } from "@/lib/utils";

type LogoProps = {
  to?: LinkOptions["to"];
  className?: string;
  size?: "small" | "default";
};

export const Logo = ({ to = "/", className, size = "default" }: LogoProps) => {
  return (
    <Link to={to} className={className}>
      <div className="flex items-center gap-2 transition hover:opacity-75">
        <LogoIcon />
        <div>
          <p
            className={cn(
              "leading-tight",
              size === "small"
                ? "text-base font-medium"
                : "text-lg font-semibold",
            )}
          >
            ByteMart
          </p>
          <p
            className={cn(
              "leading-tight text-muted-foreground",
              size === "small" ? "text-xs" : "text-sm",
            )}
          >
            Let&apos;s buy
          </p>
        </div>
      </div>
    </Link>
  );
};
