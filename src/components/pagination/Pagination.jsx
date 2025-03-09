import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"Anterior"}
      nextLabel={"Siguiente"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={"pagination flex justify-center mt-6"}
      activeClassName={"active bg-secondary-900 text-primary-100"}
      pageClassName={"page-item mx-1 bg-secondary-100 hover:bg-secondary-900 rounded-md"}
      pageLinkClassName={"page-link px-4 py-2 border rounded "}
      previousLinkClassName={"page-link px-3 py-1 mr-4 bg-primary-300 text-secondary-500 rounded-md hover:bg-primary-100 text-lg"}
      nextLinkClassName={"page-link px-3 py-1 ml-4 bg-primary-300 text-secondary-500 rounded-md hover:bg-primary-100 text-lg"}
      breakClassName={"page-item mx-1"}
      breakLinkClassName={"page-link px-4 py-2 border rounded "}
    />
  );
};

export default Pagination;
