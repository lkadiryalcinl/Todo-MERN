import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAsync, selectLoggedInUser } from '../../auth/AuthSlice.jsx'
import { useNavigate } from 'react-router-dom'

const RightSideBar = () => {

  const dispatch = useDispatch()
  const loggedInUser = useSelector(selectLoggedInUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login')
    }
  }, [loggedInUser, navigate])

  const handleLogout = () => {
    dispatch(logoutAsync())
  }

  const name = loggedInUser?.email.substring(0, loggedInUser?.email.indexOf("@"));
  console.log(name)
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h4 className='text-center'>{name}</h4>
        </div>
        <div className='col'>
          <button type="button" class="btn btn-outline-dark" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default RightSideBar;