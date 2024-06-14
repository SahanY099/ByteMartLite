import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { KeyboardEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Search = () => {
  const navigate = useNavigate();
  const router = useRouterState();

  const [query, setQuery] = useState("");

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate({ to: "/search", search: { q: query } });
    }
  };

  if (router.location.pathname === "/search") return;

  return (
    <div>
      <Button variant="outline" size="icon" asChild className="sm:hidden">
        <Link to="/search" search={{ q: "" }}>
          <SearchIcon className="h-4 w-4" />
        </Link>
      </Button>

      <div className="relative hidden md:block">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          type="search"
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyDown={handleEnter}
        />
      </div>
    </div>
  );
};
