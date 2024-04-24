import React, { useState } from "react";
import { Pagination } from "flowbite-react";
import { useThemeState } from "../../Providers/ThemeProvider";
export default function CustomPagination({
  onPageChange,
  totalPages,
  itemsPerPage,
  setOffset,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const style = {
    base: "text-gray",
    layout: {
      table: {
        base: "text-sm text-gray dark:text-gray",
        span: "font-semibold text-gray-900 dark:text-white",
      },
    },
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-lg px-3 py-2 leading-tight text-blue enabled:hover:bg-[#0A8DFF] enabled:hover:text-light",
        icon: "h-5 w-5",
      },
      next: {
        base: "rounded-lg px-3 py-2 leading-tight bg-transparent text-blue enabled:hover:bg-[#0A8DFF] enabled:hover:text-light",
        icon: "h-5 w-5",
      },
      selector: {
        base: "w-12 border-blue bg-dark py-2 pb-2.5 hover:text-[#0A8DFF] ",
        active: "bg-dark-back text-light rounded-lg pb-2.5",
        disabled: "cursor-not-allowed opacity-50 hover:text-[#0A8DFF]",
      },
    },
  };

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange && onPageChange(page);
    const offset = (page - 1) * itemsPerPage;
    setOffset(offset);
  };

  return (
    <div className={`flex overflow-x-auto sm:justify-center bg-none w-full`}>
      <Pagination
        layout="pagination"
        previousLabel=""
        nextLabel=""
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showIcons
        theme={style}
        className="flex items-center space-x-3"
      />
    </div>
  );
}
