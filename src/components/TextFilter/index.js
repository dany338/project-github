import React from 'react'
import PropTypes from 'prop-types'

const TextFilter = ({ value, icon, name, onTextChange }) => {
  const handleTextChange = event => {
    const { name, value } = event.target
    onTextChange({ name, value })
  }

  return (
    <div className="field">
      <div className="control has-icons-left">
        <input className="input" type="text" name={name} value={value} placeholder="Search Repo By Name" onChange={handleTextChange} />
        <span className="icon is-small is-left">
          <i className={`fas fa-${icon}`}></i>
        </span>
      </div>
    </div>
  );
};

TextFilter.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.oneOf(['search-plus', 'search-minus']),
  onTextChange: PropTypes.func,
}

export default TextFilter
