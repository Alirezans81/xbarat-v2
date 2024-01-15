import "../pagination.css";
import React, { useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import ReactPaginate from "react-paginate";
import Rows from "./rows";

const Pagination = ({ exchanges }) => {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "blue" : "blue";
  const paginationActive = `
  .paginationActive a {
    color: "aqua";
    background-color: "aliceblue";
}`;

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 11;
  const pagesVisited = pageNumber * usersPerPage;
  console.log(exchanges);
  const displayUsers = exchanges
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((data, index) => {
      return (
        <>
          <div>
            {index % 9 === 0 ? (
              <Rows index={index} exchanges={data} />
            ) : index % 9 === 1 ? (
              <Rows index={index} exchanges={data} />
            ) : index % 9 === 2 ? (
              <Rows index={index} exchanges={data} />
            ) : index % 9 === 3 ? (
              <Rows index={index} exchanges={data} />
            ) : index % 9 === 4 ? (
              <Rows index={index} exchanges={data} />
            ) : index % 9 === 5 ? (
              <Rows index={index} exchanges={data} />
            ) : index % 9 === 6 ? (
              <Rows index={index} exchanges={data} />
            ) : index % 9 === 7 ? (
              <Rows index={index} exchanges={data} />
            ) : (
              <Rows index={index} exchanges={data} />
            )}
          </div>
        </>
      );
    });

  const pageCount = Math.ceil(exchanges.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {displayUsers}
      <div className="PageExchange">
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
