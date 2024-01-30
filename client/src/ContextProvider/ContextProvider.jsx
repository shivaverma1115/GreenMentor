import React, { createContext, useState } from 'react'
export const authContext = createContext() ;
const ContextProvider = ({children}) => {
  const [token,setToken] = useState() ;
  const [LoginData, setLoginData] = useState() ;
  return (
    <authContext.Provider value={{
      token,setToken,
      LoginData, setLoginData
    }} >
        {children}
    </authContext.Provider>
  )
}

export default ContextProvider
