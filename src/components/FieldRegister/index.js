import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

const FieldRegister = ({ type, name, value, icon, onFieldChange }) => {
  const handleFieldChange = event => {
    const { name, value } = event.target
    const inputValue = (name === 'birthday') ? dayjs(value) : value
    onFieldChange({ name, value: inputValue })
  }

  const isRequired = (value === '') ? 'is-danger' : ''

  return (
    <div className="field">
      <div className="control has-icons-left">
        <input className={`input ${isRequired}`} type={type} name={name} value={value} placeholder={`Enter ${name}`} onChange={handleFieldChange} />
        <span className="icon is-small is-left">
          <i className={`fas fa-${icon}`}></i>
        </span>
      </div>
      <p className={`help  ${isRequired}`}>This is field {name}</p>
    </div>
  );
};

FieldRegister.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOf(['passport', 'address-card', 'calendar-alt', 'envelope', 'user-shield']),
  onFieldChange: PropTypes.func,
}

export default FieldRegister
