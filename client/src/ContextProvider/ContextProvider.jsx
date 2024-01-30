import React, { createContext, useState } from 'react'
export const authContext = createContext() ;
const ContextProvider = ({children}) => {
  const [token,setToken] = useState() ;
  const [LoginData, setLoginData] = useState() ;
  const [user, setUser] = useState({
    name: 'Shiva Verma',
    age: 26,
    email: 'shivaverma1115@gmail.com'
  });
  return (
    <authContext.Provider value={{
      token,setToken,
      LoginData, setLoginData,
      user, setUser
    }} >
        {children}
    </authContext.Provider>
  )
}

export default ContextProvider
