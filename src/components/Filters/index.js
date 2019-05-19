import React from 'react'
import PropTypes from 'prop-types'

import TextFilter from '../TextFilter'

const Filters = ({ filters, onFilterChange }) => {
  const handleOptionChange = ({ name, value }) => {
    const newFilters = { ...filters, [name]: value }
    onFilterChange(newFilters)
  }

  return (
    <nav className="navbar is-info" style={ {justifyContent: 'center'} }>
      <div className="navbar-item">
        <TextFilter
          onTextChange={handleOptionChange}
          name="name"
          value={filters.name}
          icon="search-plus"
        />
      </div>
    </nav>
  )
};

Filters.propTypes = {
  filters: PropTypes.shape({
    name: PropTypes.string,
  }),
  onFilterChange: PropTypes.func,
}

export default Filters
