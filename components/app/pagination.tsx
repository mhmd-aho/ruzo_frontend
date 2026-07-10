import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    searchParams: Record<string, string | string[] | undefined>;
}

export default function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams();
        
        // Copy all existing URL search parameters to preserve active filters
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value && key !== "page") {
                if (Array.isArray(value)) {
                    value.forEach(val => params.append(key, val));
                } else {
                    params.set(key, value);
                }
            }
        });
        
        // Set the new page parameter
        if (pageNumber > 1) {
            params.set("page", pageNumber.toString());
        }
        
        return `/collections/?${params.toString()}`;
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 py-8 font-montserrat w-full">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={createPageUrl(currentPage - 1)}
                    className="px-4 py-2 text-sm font-semibold text-black bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                    Prev
                </Link>
            ) : (
                <span className="px-4 py-2 text-sm font-semibold text-gray-400 bg-white border border-gray-200 rounded cursor-not-allowed">
                    Prev
                </span>
            )}

            {/* Page Numbers */}
            {pages[0] > 1 && (
                <>
                    <Link
                        href={createPageUrl(1)}
                        className="px-3.5 py-2 text-sm font-semibold text-black bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                        1
                    </Link>
                    {pages[0] > 2 && <span className="px-2 text-gray-400">...</span>}
                </>
            )}

            {pages.map((page) => (
                <Link
                    key={page}
                    href={createPageUrl(page)}
                    className={`px-3.5 py-2 text-sm font-semibold rounded border transition-colors ${
                        page === currentPage
                            ? "bg-primary border-primary text-white pointer-events-none"
                            : "bg-white border-gray-300 text-black hover:bg-gray-50"
                    }`}
                >
                    {page}
                </Link>
            ))}

            {pages[pages.length - 1] < totalPages && (
                <>
                    {pages[pages.length - 1] < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
                    <Link
                        href={createPageUrl(totalPages)}
                        className="px-3.5 py-2 text-sm font-semibold text-black bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                        {totalPages}
                    </Link>
                </>
            )}

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={createPageUrl(currentPage + 1)}
                    className="px-4 py-2 text-sm font-semibold text-black bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                    Next
                </Link>
            ) : (
                <span className="px-4 py-2 text-sm font-semibold text-gray-400 bg-white border border-gray-200 rounded cursor-not-allowed">
                    Next
                </span>
            )}
        </div>
    );
}
