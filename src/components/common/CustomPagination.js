import React, { useState } from "react";
import { Pagination } from "flowbite-react";

export default function CustomPagination({ totalPages, getData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => {
    setCurrentPage(page);
    getData && getData(page);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
}
