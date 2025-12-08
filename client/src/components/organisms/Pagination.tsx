import { Button } from '@/components/atoms';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  infoSuffix?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showInfo = true,
  infoSuffix = ''
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).filter((page) => {
      return (
        page === 1 ||
        page === totalPages ||
        Math.abs(page - currentPage) <= 2
      );
    });
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {/* First Page */}
        <Button
          variant="secondary"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-3"
          aria-label="First page"
        >
          ««
        </Button>

        {/* Previous Page */}
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ‹ Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index, array) => {
            const prevPage = array[index - 1];
            const showEllipsis = prevPage && page - prevPage > 1;

            return (
              <div key={page} className="flex items-center gap-1">
                {showEllipsis && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                <Button
                  variant={page === currentPage ? 'primary' : 'secondary'}
                  onClick={() => onPageChange(page)}
                  className="px-3 min-w-[40px]"
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Next Page */}
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next ›
        </Button>

        {/* Last Page */}
        <Button
          variant="secondary"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3"
          aria-label="Last page"
        >
          »»
        </Button>
      </div>

      {/* Page Info */}
      {showInfo && (
        <p className="text-gray-600">
          Showing {startItem} - {endItem} of {totalItems} products
          {infoSuffix && ` ${infoSuffix}`}
        </p>
      )}
    </div>
  );
}

