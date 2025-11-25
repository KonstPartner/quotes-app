import { usePagination } from '@features/pagination/model';
import { PaginationButton } from '@features/pagination/ui';

const PaginationBar = ({
  metadata,
  onPageChange,
}: {
  metadata: {
    totalPages: number;
    currentPage: number;
  };
  onPageChange: (page: number) => void;
}) => {
  const { totalPages, currentPage } = metadata;
  const { pages } = usePagination(metadata);

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <button
          type="button"
          className="border-border bg-card hover:bg-muted inline-flex h-8 cursor-pointer items-center rounded-md border px-3 text-xs"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
      )}

      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-3">
        {pages.map((page) => (
          <PaginationButton
            key={page}
            page={page}
            currentPage={currentPage}
            onClick={onPageChange}
          />
        ))}
      </div>

      {currentPage < totalPages && (
        <button
          type="button"
          className="border-border bg-card hover:bg-muted inline-flex h-8 cursor-pointer items-center rounded-md border px-3 text-xs"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default PaginationBar;
