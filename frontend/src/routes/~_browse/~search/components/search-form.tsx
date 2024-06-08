import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const routeApi = getRouteApi("/_browse/search");

export const SearchForm = () => {
  const navigate = useNavigate({ from: routeApi.id });
  const { q, category: categoryInParams } = routeApi.useSearch();
  const { categories } = routeApi.useLoaderData();

  const [search, setSearch] = useState(q);
  const [category, setCategory] = useState(categoryInParams);

  return (
    <form
      className="flex flex-row pb-4"
      onSubmit={(e) => {
        e.preventDefault();
        navigate({
          search: (prev) => ({ ...prev, q: search, category, page: 1 }),
        });
      }}
    >
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="mr-2 w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {categories.length &&
              categories.map(({ id, name }) => (
                <SelectItem key={id} value={id.toString()}>
                  {name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        placeholder="Search"
        className="w-full rounded-r-none focus-visible:ring-0"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        size="icon"
        variant="secondary"
        type="submit"
        className="rounded-l-none px-3"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};
