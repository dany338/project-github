import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

const Hero = ({ userGithub }) => {
  const userGithubJson = JSON.parse(userGithub)
  const { firstName, lastName, document, birthday, email, login } = userGithubJson

  const newBirthday = dayjs(birthday)
  const birthdayFormatted = newBirthday.format('dddd[,] D [de] MMMM [de] YYYY') // Format Date with days

  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">User Github</h1>
          <h2 className="subtitle">
            Name: <strong>{firstName}</strong> <strong>{lastName}</strong> Document: <strong>{document}</strong>{' '}
            Birthday: <strong>{birthdayFormatted}</strong> @ Email: <strong>{email}</strong>{' '}
            User Github: <i className="fab fa-github"></i> <strong>{login}</strong>{' '}
          </h2>
        </div>
      </div>
    </section>
  )
}

Hero.propTypes = {
  userGithub: PropTypes.string,
}

export default Hero
