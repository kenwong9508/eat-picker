type PaginationInfo = {
  page: number;
  hasNext: boolean;
};

type PaginationProps = {
  page: number;
  totalPages: number | null;
  total: number | null;
  pagination: PaginationInfo | null | undefined;
  onPageInputChange: (raw: string) => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Pagination({
  page,
  totalPages,
  total,
  pagination,
  onPageInputChange,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-end gap-4 border-t border-stone-200 bg-stone-50/80 px-4 py-3 text-xs text-stone-600 dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-300">
      <div className="flex items-center gap-2">
        <span>Go to page:</span>
        <input
          type="number"
          min={1}
          max={totalPages || 1}
          value={page}
          onChange={(e) => onPageInputChange(e.target.value)}
          className="w-16 rounded-2xl border border-stone-300 bg-transparent px-2 py-1 text-xs dark:border-stone-600"
        />
      </div>

      <div className="flex items-center gap-4">
        <span>
          Page {pagination?.page ?? page} of {totalPages ?? 1} ({total ?? 0}{" "}
          total)
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-2xl border border-stone-300 px-2 py-1 
              hover:cursor-pointer 
              disabled:cursor-not-allowed disabled:opacity-40 
              dark:border-stone-600"
            onClick={onPrev}
            disabled={(pagination?.page ?? page) === 1}
          >
            Prev
          </button>
          <button
            type="button"
            className="rounded-2xl border border-stone-300 px-2 py-1 
              hover:cursor-pointer 
              disabled:cursor-not-allowed disabled:opacity-40 
              dark:border-stone-600"
            onClick={onNext}
            disabled={!pagination?.hasNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
