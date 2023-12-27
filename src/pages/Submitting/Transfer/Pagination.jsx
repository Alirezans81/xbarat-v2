import "../pagination.css";
import React, { useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import ReactPaginate from "react-paginate";
import Rows from "./rows";

const Pagination = ({ transfers }) => {
  const theme = useThemeState();

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 11;
  const pagesVisited = pageNumber * usersPerPage;
  const displayUsers = transfers
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((data, index) => {
      return (
        <>
          <div>
            {index % 9 === 0 ? (
              <Rows index={index} transfers={data} />
            ) : index % 9 === 1 ? (
              <Rows index={index} transfers={data} />
            ) : index % 9 === 2 ? (
              <Rows index={index} transfers={data} />
            ) : index % 9 === 3 ? (
              <Rows index={index} transfers={data} />
            ) : index % 9 === 4 ? (
              <Rows index={index} transfers={data} />
            ) : index % 9 === 5 ? (
              <Rows index={index} transfers={data} />
            ) : index % 9 === 6 ? (
              <Rows index={index} transfers={data} />
            ) : index % 9 === 7 ? (
              <Rows index={index} transfers={data} />
            ) : (
              <Rows index={index} transfers={data} />
            )}
          </div>
        </>
      );
    });

  const pageCount = Math.ceil(transfers.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {displayUsers}
      <div className="Page">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={
            theme === "dark" ? "paginationBttnsDark" : "paginationBttnsLight"
          }
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={
            theme === "dark" ? "paginationActiveDark" : "paginationActiveLight"
          }
        />
      </div>
    </>
  );
};

export default Pagination;
