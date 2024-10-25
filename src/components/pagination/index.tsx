import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Helper function to generate page numbers
    const getPageNumbers = () => {
        const totalPageNumbersToShow = 3; // Number of visible page numbers
        const halfWay = Math.floor(totalPageNumbersToShow / 2);
        let startPage = Math.max(0, currentPage - halfWay);
        let endPage = Math.min(totalPages - 1, currentPage + halfWay);

        // Adjust start and end if they go out of bounds
        if (startPage === 0) {
            endPage = Math.min(totalPages - 1, totalPageNumbersToShow - 1);
        } else if (endPage === totalPages - 1) {
            startPage = Math.max(0, totalPages - totalPageNumbersToShow);
        }

        const pages: (number | string)[] = [];

        // Always show the first page
        if (startPage > 0) {
            pages.push(0);
            if (startPage > 1) {
                pages.push('...');
            }
        }

        // Show middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Always show the last page
        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) {
                pages.push('...');
            }
            pages.push(totalPages - 1);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <ul className=" flex items-center gap-[4px]">
            {pageNumbers.map((page, index) => (
                <li
                    key={index}
                    className={`h-8 w-8 flex justify-center items-center rounded-md ${currentPage === page ? 'bg-primaryColor  text-white' : 'bg-slate-200 text-primaryColor hover:!bg-yellow hover:!text-white focus:!bg-primaryColor focus:!text-white'}`}
                >
                    {page === '...' ? (
                        <span className="focus:shadow-none focus:bg-slate-200 hover:text-primaryColor bg-slate-500 border-primaryColor">...</span>
                    ) : (
                        <button
                            className={`h-8 w-8 flex justify-center items-center  rounded-md bg-slate-200 ${
                                currentPage === page
                                    ? '!bg-primaryColor text-white'
                                    : 'hover:!bg-yellow-400 hover:!text-white '
                            }`}
                            onClick={() => typeof page === 'number' && onPageChange(page)}
                        >
                            {typeof page === 'number' ? page + 1 : page}
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Pagination;
