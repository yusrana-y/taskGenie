import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <>
    <div className="container w-100" style={{minHeight:'100vh'}}>
      
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-lg-6">
          <h1 style={{fontSize:'70px'}}>Organize your work and life, finally!</h1>
          <Link to='/login' className='btn fw-bolder fs-5 btn-secondary text-primary'>Start Here</Link>
        </div>
        <div className="col-lg-6">
          <img src="https://piqnic.com/wp-content/uploads/2024/05/tm-6.svg" alt="Task manager image" width={'100%'} className='pt-5' />
        </div>
      </div>
      <div>
       <h3 className='text-center pt-5'> <span className='text-primary'> Task Genie</span> - your go to task management App!</h3>
      </div>
    </div>
    </>
  )
}

export default Home
