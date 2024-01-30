import React, { createContext, useState } from 'react'
export const authContext = createContext();

const ContextProvider = ({ children }) => {
  // --------------- User Token ----------------
  const [token, setToken] = useState();

  // --------------- User Login Data ----------------
  const [LoginData, setLoginData] = useState();

  // --------------- User Dashboard Data ----------------
  const [user, setUser] = useState({
    name: 'Shiva Verma',
    age: 26,
    email: 'shivaverma1115@gmail.com'
  });

  return (
    <authContext.Provider value={{
      token, setToken,
      LoginData, setLoginData,
      user, setUser
    }} >
      {children}
    </authContext.Provider>
  )
}

export default ContextProvider
