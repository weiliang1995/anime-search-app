type Props = {
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  isLoading: boolean;
};

export default function Pagination({
  currentPage,
  hasNextPage,
  onPageChange,
  isLoading,
}: Props) {
  const prev2Page = currentPage - 2 > 0;
  const prev1Page = currentPage - 1 > 0;
  const canNext = hasNextPage;
  const backToFirstPage = currentPage > 2;
  return (
    <div className="flex items-center justify-end gap-4 mt-8 select-none">
      {backToFirstPage && (
        <button
          onClick={() => backToFirstPage && !isLoading && onPageChange(1)}
          disabled={!backToFirstPage || isLoading}
          className={`px-3 py-1 rounded border text-white ${
            backToFirstPage && !isLoading
              ? "hover:bg-gray-100"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          Back to First Page
        </button>
      )}
      {prev2Page && (
        <button
          onClick={() =>
            prev2Page && !isLoading && onPageChange(currentPage - 2)
          }
          disabled={!prev2Page || isLoading}
          className={`px-3 py-1 rounded border text-white ${
            prev2Page && !isLoading
              ? "hover:bg-gray-100"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          {currentPage - 2}
        </button>
      )}
      {prev1Page && (
        <button
          onClick={() =>
            prev1Page && !isLoading && onPageChange(currentPage - 1)
          }
          disabled={!prev1Page || isLoading}
          className={`px-3 py-1 rounded border text-white ${
            prev1Page && !isLoading
              ? "hover:bg-gray-100"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          {currentPage - 1}
        </button>
      )}
      <button className="px-3 py-1 rounded border border-yellow-400 text-yellow-400">
        {currentPage}
      </button>
      <button
        onClick={() => canNext && !isLoading && onPageChange(currentPage + 1)}
        disabled={!canNext || isLoading}
        className={`px-3 py-1 rounded border text-white ${
          canNext && !isLoading
            ? "hover:bg-gray-100"
            : "opacity-50 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
}
