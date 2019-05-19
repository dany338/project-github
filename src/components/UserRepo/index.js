import React from 'react'
import PropTypes from 'prop-types'

const UserRepo = ({ id, language, default_branch, html_url, name, description }) => {
  const newDescription = (description === '' || description === null) ? 'without description' : description

  return (
    <tr key={id}>
      <td>{language}</td>
      <td>{default_branch}</td>
      <td>{html_url}</td>
      <td>{name}</td>
      <td>{newDescription}</td>
    </tr>
  )
}

UserRepo.propTypes = {
  id: PropTypes.number,
  language: PropTypes.string,
  default_branch: PropTypes.string,
  html_url: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
}

export default UserRepo
