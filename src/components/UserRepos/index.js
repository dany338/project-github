import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

import UserRepo from '../UserRepo'
import Pagination from '../Pagination'

const UserRepos = ({ userGithub, paginationConfig, data, onSetPagination, onSetOrderData, onSetResetList }) => {
  const userGithubJson = JSON.parse(userGithub)
  const { firstName, lastName, birthday, email, login } = userGithubJson
  const newBirthday = dayjs(birthday)
  const birthdayFormatted = newBirthday.format('dddd[,] D [de] MMMM [de] YYYY') // Format Date with days

  const handleOrderColumn = (column, order) => {
    onSetOrderData(column, order)
  }

  return (
    <section className="hero is-light">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Repos of user <i className="fab fa-github"></i> {login}</h1>
          <h2 className="subtitle">{firstName} {lastName} @ {email} <i className="fas fa-envelope"></i> {birthdayFormatted}</h2>
          <hr/>
          <Pagination
            pagination={paginationConfig}
            onSetPagination={onSetPagination}
            onSetResetList={onSetResetList} />
          <hr/>
          <table className="table is-hoverable">
            <thead>
              <tr>
                <th><abbr title="Language Order" column="language" order="-" onClick={() => handleOrderColumn('language', '-')}>Language</abbr></th>
                <th><abbr title="Default Branch Order" column="default_branch" order="-" onClick={() => handleOrderColumn('default_branch', '-')}>Default Branch</abbr></th>
                <th><abbr title="URL GIT Order" column="html_url" order="-" onClick={() => handleOrderColumn('html_url', '-')}>URL GIT</abbr></th>
                <th><abbr title="Name Order" column="name" order="-" onClick={() => handleOrderColumn('name', '-')}>Name</abbr></th>
                <th><abbr title="Description Order" column="description" order="-" onClick={() => handleOrderColumn('description', '-')}>Description</abbr></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
              <th><abbr title="Language Order" column="language" order="-" onClick={() => handleOrderColumn('language', '-')}>Language</abbr></th>
                <th><abbr title="Default Branch Order" column="default_branch" order="-" onClick={() => handleOrderColumn('default_branch', '-')}>Default Branch</abbr></th>
                <th><abbr title="URL GIT Order" column="html_url" order="-" onClick={() => handleOrderColumn('html_url', '-')}>URL GIT</abbr></th>
                <th><abbr title="Name Order" column="name" order="-" onClick={() => handleOrderColumn('name', '-')}>Name</abbr></th>
                <th><abbr title="Description Order" column="description" order="-" onClick={() => handleOrderColumn('description', '-')}>Description</abbr></th>
              </tr>
            </tfoot>
            <tbody>
              {data.map((userRepo, index) => (
                <UserRepo key={index} {...userRepo} />
              ))}
            </tbody>
          </table>
          <hr/>
          <Pagination
            pagination={paginationConfig}
            onSetPagination={onSetPagination}
            onSetResetList={onSetResetList} />
          <hr/>
        </div>
      </div>
    </section>
  )
}

UserRepos.propTypes = {
  userGithub: PropTypes.string,
  paginationConfig: PropTypes.shape({
    pageCount: PropTypes.number,
    defaultPage: PropTypes.number,
    limit: PropTypes.number,
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      language: PropTypes.string,
      default_branch: PropTypes.string,
      html_url: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
    })
  ),
  onSetPagination: PropTypes.func,
  onSetOrderData: PropTypes.func,
  onSetResetList: PropTypes.func,
}

export default UserRepos
