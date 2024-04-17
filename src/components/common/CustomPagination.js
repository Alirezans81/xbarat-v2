import React, { useState } from "react";
import { Pagination } from "flowbite-react";

export default function CustomPagination({
  onPageChange,
  totalPages,
  itemsPerPage,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange && onPageChange(page);
    const offset = (page - 1) * itemsPerPage;
    console.log(offset);
  };

  return (
    <div className="flex justify-center">
      <Pagination
        layout="pagination"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
