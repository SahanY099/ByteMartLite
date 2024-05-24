export function getPaginationItems(currentPage: number, totalPages: number) {
  const pageNumbers: (number | "previous" | "..." | "next")[] = [];
  const range = 2; // Number of pages to show before and after the current page

  if (totalPages <= 1) {
    return pageNumbers;
  }

  if (currentPage > 1) {
    pageNumbers.push("previous");
  }

  // Always show the first page
  pageNumbers.push(1);

  if (currentPage > range + 2) {
    pageNumbers.push("...");
  }

  for (
    let i = Math.max(2, currentPage - range);
    i <= Math.min(totalPages - 1, currentPage + range);
    i++
  ) {
    pageNumbers.push(i);
  }

  if (currentPage < totalPages - range - 1) {
    pageNumbers.push("...");
  }

  // Always show the last page
  pageNumbers.push(totalPages);

  if (currentPage < totalPages) {
    pageNumbers.push("next");
  }

  return pageNumbers;
}
