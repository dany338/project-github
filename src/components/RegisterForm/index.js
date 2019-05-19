import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import FieldRegister from '../FieldRegister'

const RegisterForm = ({ candidate, onRegisterFormChange, onSubmit }) => {
  const { firstName, lastName, document, birthday, email, login } = candidate
  const birthdayFormatted = birthday.format('YYYY[-]MM[-]DD')
  const handleInputChange = ({ name, value }) => {
    const newRegister = { ...candidate, [name]: value }
    onRegisterFormChange(newRegister)
  }

  const handleSubmit = () => {
    if(candidate.login !== '') {
      onSubmit()
    }
  }

  return (
    <section className="hero is-light">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Register Form Candidate</h1>
          <h2 className="subtitle">Your Data & Github</h2>
          <hr/>
          <div className="columns">
            <div className="column is-half">
              <FieldRegister
                type="text"
                name="firstName"
                value={firstName}
                icon="address-card"
                onFieldChange={handleInputChange}
              />
              <FieldRegister
                type="text"
                name="lastName"
                value={lastName}
                icon="address-card"
                onFieldChange={handleInputChange}
              />
              <FieldRegister
                type="text"
                name="document"
                value={document}
                icon="passport"
                onFieldChange={handleInputChange}
              />
              <FieldRegister
                type="date"
                name="birthday"
                value={birthdayFormatted}
                icon="calendar-alt"
                onFieldChange={handleInputChange}
              />
              <FieldRegister
                type="text"
                name="email"
                value={email}
                icon="envelope"
                onFieldChange={handleInputChange}
              />
              <FieldRegister
                type="text"
                name="login"
                value={login}
                icon="user-shield"
                onFieldChange={handleInputChange}
              />
              <div className="field is-grouped">
                <p className="control">
                  <button className="button is-primary" onClick={handleSubmit}>Save</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

RegisterForm.propTypes = {
  candidate: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    document: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    birthday: PropTypes.instanceOf(dayjs),
    email: PropTypes.string,
    login: PropTypes.string,
  }),
  onRegisterFormChange: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default RegisterForm
