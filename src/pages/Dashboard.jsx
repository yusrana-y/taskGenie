import React from 'react'
import TaskCard from '../components/TaskCard'
import Add from '../components/Add'
import Header from '../components/Header'
import { getAllTaskAPI } from '../services/allAPI'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { addResponseContext, deleteResponseContext,updateResponseContext } from '../contexts/ShareContext'

const Dashboard = () => {
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const {deleteResponse,setDeleteResponse} = useContext(deleteResponseContext)
  const {updateResponse,setUpdateResponse} = useContext(updateResponseContext)


  const [allTask, setAllTask] = useState([])
  const [searchKey,setSearchKey] = useState("")

  console.log(searchKey);
  

  const [currentPage,setCurrentPage] = useState(1)
  const taskPerPage = 6
  const totalPage = Math.ceil(allTask?.length/taskPerPage)

  const currentPageLastIndex = currentPage*taskPerPage
  const currentPageStartIndex = currentPageLastIndex - taskPerPage

  const slicedTask= allTask?.slice(currentPageStartIndex,currentPageLastIndex)

  const NavToNextPage =  ()=>{
    if(currentPage!=totalPage)
      {
        setCurrentPage(currentPage+1)
      }
  }

  const NavToPrevPage = () =>{
    if(currentPage!=1)
    {
      setCurrentPage(currentPage-1)
    }
  }

  useEffect(() => {
    getAllTask()
  }, [addResponse,deleteResponse,updateResponse,searchKey])

  
  const getAllTask = async () => {
    //get the token 
    const token = sessionStorage.getItem("token")
    // console.log(token);
    // console.log("im called");    
    
    //api call
    if (token) {
      try {
        const reqHeader = {
          'Authorization': `Bearer ${token}`
        }
        const result = await getAllTaskAPI(searchKey,reqHeader)
        // console.log(result.data);

        if (result.status == 200) {
          setAllTask(result.data)

        }
        else {
          console.log(result.response.data);

        }
      }
      catch (err) {
        console.log(err);
      }
    }

    // console.log(allTask);

  }

  return (
    <>
      <Header/>
      <div className="container mt-5">
        <Add />
        
        <input type="text" className="form-control w-25 shadow border border-1 ms-3" placeholder="Search task here" onChange={e=>setSearchKey(e.target.value)} />
        <div className="container row mt-3">
        {allTask?.length > 0 ?
         slicedTask?.map((item)=>(
          <div className="col-lg-4 mt-3">
          <TaskCard task={item} />
        </div>
         ))
          
           :

          <div className="container d-flex flex-column justify-content-center align-items-center w-100" style={{ minHeight: '80vh' }}>
            <div>
              <img src="https://icons.iconarchive.com/icons/icons8/windows-8/256/Files-Add-File-icon.png" alt="" />
            </div>
            <h3 className="mt-4"> <span className="text-danger">No tasks!</span> Click the '+' button to jot down your ideas,thoughts and reminder!</h3>
          </div>
        }
  </div>

  <div className='d-flex justify-content-center align-items-center my-5'>
    <span onClick={NavToPrevPage}><i className='fa-solid fa-backward me-5' style={{cursor:'pointer'}}></i></span>
    <span className='fw-bolder'>{currentPage} of {totalPage}</span>
    <span onClick={NavToNextPage}><i className='fa-solid fa-forward ms-5' style={{cursor:'pointer'}}></i></span>

  </div>
      </div>
    </>
  )
}

export default Dashboard
