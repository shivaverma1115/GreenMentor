import React, { createContext, useState } from 'react'
export const authContext = createContext() ;
const ContextProvider = ({children}) => {
  const [token,setToken] = useState() ;
  return (
    <authContext.Provider value={{
      token,setToken
    }} >
        {children}
    </authContext.Provider>
  )
}

export default ContextProvider
