import { getRouteApi } from "@tanstack/react-router";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getPaginationItems } from "@/lib/pagination-items";

const routeApi = getRouteApi("/dashboard/products/");

export function TablePagination() {
  const { meta, links } = routeApi.useLoaderData();
  const paginationItems = getPaginationItems(meta.currentPage, meta.lastPage);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-xs text-muted-foreground">
        Showing{" "}
        <strong>
          {meta.from}-{meta.to}
        </strong>{" "}
        of <strong>{meta.total}</strong> products
      </div>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          {paginationItems.map((item, index) => {
            if (item === "previous") {
              return (
                <PaginationItem key={index}>
                  <PaginationPrevious
                    disabled={links.prev == null ? true : false}
                    to="/dashboard/products"
                    search={{ page: links.prev }}
                  />
                </PaginationItem>
              );
            }
            if (item === "next") {
              return (
                <PaginationItem key={index}>
                  <PaginationNext
                    disabled={links.next == null ? true : false}
                    to="/dashboard/products"
                    search={{ page: links.next }}
                  />
                </PaginationItem>
              );
            }
            if (item === "...") {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  to="/dashboard/products"
                  search={{ page: item }}
                  isActive={item === meta.currentPage}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
