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
import { PaginationLinks, PaginationMeta } from "@/types/response-types";

type ProductsPaginationProps = {
  meta: PaginationMeta;
  links: PaginationLinks;
};

export function ProductsPagination({ meta, links }: ProductsPaginationProps) {
  const paginationItems = getPaginationItems(meta.currentPage, meta.lastPage);

  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
      <div className="text-xs text-muted-foreground">
        Showing
        <strong>
          {meta.from}-{meta.to}
        </strong>
        of <strong>{meta.total}</strong> products
      </div>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          {paginationItems.map((item, index) => {
            if (item === "previous") {
              return (
                <PaginationItem key={index}>
                  <PaginationPrevious
                    to="/search"
                    preload="intent"
                    search={(prev) => ({ ...prev, page: links.prev })}
                    disabled={links.prev == null ? true : false}
                  />
                </PaginationItem>
              );
            }
            if (item === "next") {
              return (
                <PaginationItem key={index}>
                  <PaginationNext
                    to="/search"
                    preload="intent"
                    search={(prev) => ({ ...prev, page: links.next })}
                    disabled={links.next == null ? true : false}
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
                  to="/search"
                  preload="intent"
                  search={(prev) => ({ ...prev, page: item })}
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
