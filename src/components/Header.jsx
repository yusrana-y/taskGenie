import React from 'react'
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../contexts/TokenContext';



const Header = () => {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    sessionStorage.clear()
    setIsAuthorized(false)
    navigate('/')
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand style={{cursor:'pointer'}}>
            <i className="fa-solid fa-list-check me-2" style={{ fontSize: '1.5rem' }}></i>
            Task Genie
          </Navbar.Brand>
          <Button variant="outline-light" className="ms-auto" onClick={handleLogout}>
            <i className="fa-solid fa-sign-out-alt me-1"></i> Logout
          </Button>

        </Container>
      </Navbar>
    </>
  )
}

export default Header
