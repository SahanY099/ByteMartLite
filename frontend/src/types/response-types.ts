export type PaginationLinks = {
  first: number | null;
  last: number | null;
  prev: number | null;
  next: number | null;
};

export type PaginationMeta = {
  currentPage: number;
  from: number;
  lastPage: number;
  path: string;
  perPage: number;
  to: number;
  total: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
};
