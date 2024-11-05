import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const addResponseContext = createContext()
export const deleteResponseContext = createContext()
export const updateResponseContext = createContext()

const ShareContext = ({ children }) => {
  const [addResponse, setAddResponse] = useState("")
  const [deleteResponse, setDeleteResponse] = useState("")
  const [updateResponse,setUpdateResponse] = useState("")
  return (
    <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
      <deleteResponseContext.Provider value={{ deleteResponse, setDeleteResponse }}>
        <updateResponseContext.Provider value={{updateResponse,setUpdateResponse}}>
          {children}
        </updateResponseContext.Provider>
      </deleteResponseContext.Provider>
    </addResponseContext.Provider>
  )
}

export default ShareContext
