import React, { useContext } from 'react'
import { authContext } from '../ContextProvider/ContextProvider';
import { Navigate, Outlet } from 'react-router-dom';

const PrivetAllRoutes = () => {
    const {token} = useContext(authContext) ;  // for private routing
  return (
    token?<Outlet/> : <Navigate to={'/'} />
  )
}

export default PrivetAllRoutes
