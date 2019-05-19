/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ pagination, onSetPagination, onSetResetList }) => {
  const handleSetDefaultPage = page => {
    const newPagination = { ...pagination, defaultPage: page }
    onSetPagination(newPagination)
  }

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
        <a
          href="javascript:void(0)"
          className="pagination-previous"
          title={`Reset List`}
          onClick={onSetResetList}
        >
          Reset List
        </a>
      {(pagination.defaultPage === 1) ? (
        <a
          href="javascript:void(0)"
          className="pagination-previous"
          title={`This is the ${pagination.defaultPage}  page`}
          disabled
        >
          Previous
        </a>
      ) : (
        <a
          href="javascript:void(0)"
          className="pagination-previous"
          title={`This is the ${pagination.defaultPage}  page`}
          onClick={() => (pagination.defaultPage > 1 ) ? handleSetDefaultPage(pagination.defaultPage - 1) : ''}
        >
          Previous
        </a>
      )}

      {(pagination.defaultPage === pagination.pageCount) ? (
        <a
          href="javascript:void(0)"
          className="pagination-next"
          title={`This is the ${pagination.defaultPage}  page`}
          disabled
        >
          Next page
        </a>
      ) : (
        <a
          href="javascript:void(0)"
          className="pagination-next"
          title={`This is the ${pagination.defaultPage}  page`}
          onClick={() => (pagination.defaultPage <= pagination.pageCount ) ? handleSetDefaultPage(pagination.defaultPage + 1) : ''}
        >
          Next page
        </a>
      )}

      <ul className="pagination-list">
        {Array.from({ length: pagination.pageCount }, (_, index) => (
          <li key={index}>
            <a
              className={`pagination-link ${pagination.defaultPage === (index + 1) ? 'is-current' : 'button'}`}
              href="javascript:void(0)"
              aria-label={`Page ${index}`}
              aria-current="page"
              onClick={() => ((index + 1) !== pagination.defaultPage) ? handleSetDefaultPage(index + 1) : ''}
            >
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  pagination: PropTypes.shape({
    pageCount: PropTypes.number,
    defaultPage: PropTypes.number,
    limit: PropTypes.number,
  }),
  onSetPagination: PropTypes.func,
  onSetResetList: PropTypes.func,
}

export default Pagination
