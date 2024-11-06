import React from 'react'
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI, loginAPI } from '../services/allAPI'
import Spinner from 'react-bootstrap/Spinner';
import { useContext } from 'react';
import { tokenAuthContext } from '../contexts/TokenContext';



const Auth = ({ insideRegister }) => { 
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)
  const [isLoading,setIsLoading]= useState(false)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "", email: "", password: ""
  })
  console.log(userData);


  const handleRegister = async (e) => {
    e.preventDefault()
    console.log("Register button clicked");
    if (userData.username && userData.email && userData.password) {
      try {
        const result = await registerAPI(userData)
        console.log(result);

        if (result.status == 200) {
          alert("registration is succesfull")
          setUserData({
            username: "", email: "", password: ""
          })
          navigate('/login')
        }
        else {
          if (result.status == 406)
            alert(result.response.data)
          setUserData({
            username: "", email: "", password: ""
          })
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      alert("please fill the form completely")
    }

  }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("inside login button");
    if (userData.email && userData.password) {
      try {
        const result = await loginAPI(userData)
        console.log(result);
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          setIsAuthorized(true)
          setIsLoading(true)
          setTimeout(() => {
            navigate('/dashboard')
            setUserData({ username: "", email: "", password: "" })
            setIsLoading(false)
          }, 2000);
        }
        else {
          if (result.status == 404)
            alert(result.response.data)
        }
      }
      catch (err) {
        console.log(err);

      }

    }
    else {
      alert("please fill the form completely")
    }

  }

  return (
    <>
      <div className="container w-100" style={{ minHeight: '100vh' }}>

        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-6">
            <img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5425.jpg" alt="Task manager image" width={'100%'} className='pt-5' />
          </div>
          <div className="col-lg-6">
            <form action="">

              {insideRegister && <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  placeholder="username"
                  value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })}
                />
                <label htmlFor="floatingInputCustom" >Username</label>
              </Form.Floating>}

              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  type="email"
                  placeholder="name@example.com"
                  value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })}
                />
                <label htmlFor="floatingInputCustom">Email address</label>
              </Form.Floating>

              <Form.Floating>
                <Form.Control
                  id="floatingPasswordCustom"
                  type="password"
                  placeholder="Password"
                  value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })}
                />
                <label htmlFor="floatingPasswordCustom">Password</label>
              </Form.Floating>

              {insideRegister ?
                <div> <button className='btn bg-primary text-center w-50 fs-5 mt-3' onClick={handleRegister}>Register</button>
                  <h5 className='pt-2'>Already registered? <Link to='/login'>Login</Link></h5></div>
                :
                <div> <button className='btn bg-primary text-center w-50 fs-5 mt-3 ' onClick={handleLogin}>Login  {isLoading && <Spinner animation="border" variant="light"  className="ms-3"/>}
 
</button>
                  <h5 className='pt-2'>Not yet registered?<Link to='/register'>Register Now</Link></h5></div>
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
