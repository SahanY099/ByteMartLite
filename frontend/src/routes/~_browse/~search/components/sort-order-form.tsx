import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { ArrowDownUp, ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { orderOptions, sortOptions } from "../schemas";

const routeApi = getRouteApi("/_browse/search");

export const SortOrderForm = () => {
  const navigate = useNavigate({ from: routeApi.id });
  const { order, sort } = routeApi.useSearch();

  const setSort = (sort: "name" | "price" | "created_at") => {
    navigate({
      search: (prev) => ({
        ...prev,
        sort,
      }),
    });
  };

  const setOrder = (order: "asc" | "desc") => {
    navigate({
      search: (prev) => ({
        ...prev,
        order,
      }),
    });
  };

  return (
    <div className="flex flex-row gap-4">
      {/* sort */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-7 gap-1">
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Sort {sort && ": "}
              {sortOptions.find((option) => option.value === sort)?.label}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sortOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={sort === option.value}
              onClick={() => setSort(option.value)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* order */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-7 gap-1">
            <ArrowDownUp className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Order {order && ": "}
              {orderOptions.find((option) => option.value === order)?.label}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Order by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {orderOptions.map(({ icon: Icon, label, value }) => (
            <DropdownMenuCheckboxItem
              key={value}
              checked={order === value}
              onClick={() => setOrder(value)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
