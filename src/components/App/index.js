import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useCookie } from '@use-hook/use-cookie';

// Imports Components in the app
import RegisterForm from '../RegisterForm'
import Hero from '../Hero'
import Filters from '../Filters'
import UserRepos from '../UserRepos'

dayjs.locale('es') // Format Date in Spanish

const API_URL_GITHUB   = 'https://api.github.com/users/'
const in30Minutes      = 1/48; // Expire cookie in 30 minutes for testing with other user

const App = () => {
  // Define Default Props
  const defaultCandidate = {
    firstName: '',
    lastName: '',
    document: 0,
    birthday: dayjs(),
    email: '',
    login: ''
  }
  const defaultPagination = {
    pageCount: 0,
    defaultPage: 1,
    limit: 5
  }

  // Define state with react hooks
  const [clicked, setClicked] = useState(false);
  const [isorder, setOrder] = useState(false);
  const [candidate, setCandidate] = useState(defaultCandidate);
  const [filters, setFilters] = useState({ name: '' });
  const [pagination, setPagination] = useState(defaultPagination);
  const [userReposBackup, setUserReposBackup] = useState([]);
  const [userReposFiltered, setUserReposFiltered] = useState([]);

  // Use useCookie the react hooks for save information in the cookie
  const [userGithub, setUserGithub] = useCookie('userGithub', defaultCandidate)

  // Handle func filter for search text
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterChange = newFilters => {
    setFilters(newFilters)
    handleApplyFilters(userReposBackup)
  }

  // Handle func for apply filters in the data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleApplyFilters = (data) => {
    if(filters.name === '') {
      handleApplyPagination(data)
    } else if(filters.name.length > 2) {
      setOrder(false)
      let reposFiltered = userReposBackup
      .filter(({ name }) => name.includes(filters.name) )
      const offset = pagination.defaultPage * pagination.limit
      const init = offset - pagination.limit
      reposFiltered = [...reposFiltered.slice(init, offset)];
      setUserReposFiltered(reposFiltered)
    }
  }

  // Handle func register for form user git
  const handleRegisterFormChange = newRegister => {
    setCandidate(newRegister)
  }

  // Handle func event submit for search user in the API GITHUB 3.0
  const handleSubmit = () => {
    if(candidate.login !== '') {
      getUserRepos()
    }
  }

  // Handle func updated pagination
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSetPagination = newPagination => {
    setPagination(newPagination)
    handleApplyFilters(userReposBackup)
  }

  const handleResetList = () => {
    setOrder(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSetOrderData = (column, order) => {
    const reposFiltered = userReposFiltered.sort(dynamicSort(column, order))
    setOrder(true)
    handleApplyFilters(reposFiltered)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dynamicSort = (property, order) => {
    var sortOrder = (order === '-') ? -1 : 1;

    return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  // Handle func for apply pagination in the data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleApplyPagination = (data) => {
    const offset = pagination.defaultPage * pagination.limit
    const init = offset - pagination.limit
    const reposFiltered = [...data.slice(init, offset)];

    setUserReposFiltered(reposFiltered)
  }

  // Func async for get data from URL_GITHUB
  const getUserRepos = async () => {
    try {
      // Get Data From API GITHUB
      const BASE_PATH     = API_URL_GITHUB + candidate.login + '/repos'
      const response      = await fetch(BASE_PATH)
      const data          = await response.json()

      // Calculate Pagination
      const countData     = data.length
      const { limit }     = pagination
      const pageCount     = Math.ceil(countData / limit)
      const newPagination = { ...pagination, pageCount: pageCount }

      // Updated state App
      setUserReposBackup(data)
      setUserReposFiltered(data)
      setPagination(newPagination)
      const candidateJson = JSON.stringify(candidate)
      setUserGithub(candidateJson, { expires: in30Minutes })
      setClicked(true)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(candidate.login !== '' && clicked ) {
      if(isorder) {
        handleApplyFilters(userReposFiltered)
      } else {
        handleApplyFilters(userReposBackup)
      }
    }
  }, [userReposFiltered, userReposBackup, isorder, setOrder, handleSetOrderData, handleSetPagination, setPagination, setUserReposFiltered, filters, clicked, candidate, setUserGithub, userGithub, handleApplyPagination, handleApplyFilters, handleFilterChange]);

  return (
    <div className="container">
      {(candidate.login !== '' && clicked ) ? (
        <>
          <Hero userGithub={userGithub} />
          <Filters filters={filters} onFilterChange={handleFilterChange} />
          <UserRepos
            userGithub={userGithub}
            paginationConfig={pagination}
            onSetPagination={handleSetPagination}
            onSetOrderData={handleSetOrderData}
            onSetResetList={handleResetList}
            data={userReposFiltered} />
        </>
      ) : (
        <RegisterForm
          candidate={candidate}
          onRegisterFormChange={handleRegisterFormChange}
          onSubmit={handleSubmit} />
      )}
    </div>
  )
}

export default App
