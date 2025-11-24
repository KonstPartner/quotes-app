const PaginationButton = ({
  page,
  currentPage,
  onClick,
}: {
  page: number;
  currentPage: number;
  onClick: (page: number) => void;
}) => {
  const isCurrent = page === currentPage;

  return (
    <button
      type="button"
      onClick={() => onClick(page)}
      disabled={isCurrent}
      className={`inline-flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-md border px-2 text-xs font-medium transition ${
        isCurrent
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-foreground hover:bg-muted'
      } disabled:cursor-default disabled:opacity-80`}
    >
      {page}
    </button>
  );
};

export default PaginationButton;
