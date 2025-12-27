export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {

  // Case 1:
  // If the total number of pages is 7 or less,
  // show all page numbers without ellipsis
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Case 2:
  // If the current page is within the first 3 pages,
  // show the first 3 pages, an ellipsis, and the last 2 pages
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // Case 3:
  // If the current page is within the last 3 pages,
  // show the first 2 pages, an ellipsis, and the last 3 pages
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // Case 4:
  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page with its neighbors,
  // another ellipsis, and the last page
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
