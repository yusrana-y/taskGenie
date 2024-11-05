import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'


export const tokenAuthContext = createContext()

const TokenContext = ({children}) => {
    const [isAuthorized,setIsAuthorized] = useState(false)
  return (
    <tokenAuthContext.Provider value={{isAuthorized,setIsAuthorized}}>
        {children}
    </tokenAuthContext.Provider>
  )
}

export default TokenContext
