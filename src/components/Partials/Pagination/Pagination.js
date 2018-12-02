import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

const Pagination = ({ handlePageClick, pageCount }) => (
  <ReactPaginate
    previousLabel={'previous'}
    nextLabel={'next'}
    breakLabel={<a
      role="button"
      tabIndex="0"
      onClick={e => e.preventDefault()}
    >...</a>}
    breakClassName={'break-me'}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={handlePageClick}
    containerClassName={'pagination'}
    subContainerClassName={'pages pagination'}
    activeClassName={'active'}
  />
);

Pagination.propTypes = {
  handlePageClick: PropTypes.func.isRequired,
  pageCount: PropTypes.number
};

Pagination.defaultProps = {
  pageCount: 1
};

export default Pagination;
