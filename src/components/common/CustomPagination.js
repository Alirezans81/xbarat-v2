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

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange && onPageChange(page);
    const offset = (page - 1) * itemsPerPage;
    setOffset(offset);
  };

  return (
    <div className={`flex overflow-x-auto sm:justify-center bg-${theme}`}>
      <Pagination
        layout="pagination"
        previousLabel=""
        nextLabel=""
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showIcons
      />
    </div>
  );
}
