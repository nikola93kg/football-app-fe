import React from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Pagination({
  canPreviousPage,
  canNextPage,
  pageIndex,
  pageOptions,
  nextPage,
  previousPage,
  setPageSize,
  pageSize,
}) {
  return (
    <div className="pagination">
        <button onClick={previousPage} disabled={!canPreviousPage}>
        <FaArrowLeft />
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={nextPage} disabled={!canNextPage}>
        <FaArrowRight />
        </button>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
  );
}

export default Pagination;
