const usePagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}): { pages: number[] } => {
  const pages: number[] = [];
  const maxButtons = 5;

  if (totalPages <= 0) {
    return { pages };
  }

  pages.push(1);

  let startPage = Math.max(2, currentPage - 1);
  let endPage = Math.min(totalPages - 1, currentPage + 1);

  if (totalPages <= maxButtons) {
    startPage = 2;
    endPage = totalPages - 1;
  } else if (endPage - startPage < 2) {
    if (currentPage < totalPages / 2) {
      endPage = Math.min(totalPages - 1, startPage + 2);
    } else {
      startPage = Math.max(2, endPage - 2);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages > 1 && pages[pages.length - 1] !== totalPages) {
    pages.push(totalPages);
  }

  return { pages };
};

export default usePagination;
