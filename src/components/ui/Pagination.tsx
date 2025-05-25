import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Hiển thị tối đa 5 trang, có ... nếu nhiều hơn
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    if (currentPage <= 3) end = Math.min(5, totalPages);
    if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-6">
      <div className="flex items-center justify-center gap-2">
        <button
          className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {getPageNumbers()[0] > 1 && (
          <>
            <button
              className="px-3 py-1 rounded border bg-white"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            <span>...</span>
          </>
        )}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded border ${page === currentPage ? "bg-black text-white" : "bg-white"}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        {getPageNumbers().at(-1)! < totalPages && (
          <>
            <span>...</span>
            <button
              className="px-3 py-1 rounded border bg-white"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        Trang {currentPage} / {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
