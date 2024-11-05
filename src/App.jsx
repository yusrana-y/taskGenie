import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { useContext } from 'react'
import { tokenAuthContext } from './contexts/TokenContext'


function App() {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Auth/>}></Route>
      <Route path='/register' element={<Auth insideRegister={true}/>}></Route>
      <Route path='/dashboard' element={isAuthorized?<Dashboard/>:<Navigate to='/login'/>}></Route>

    </Routes>
    </>
  )
}

export default App
