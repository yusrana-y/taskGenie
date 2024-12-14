import React from 'react'
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addTaskAPI } from '../services/allAPI'
import { addResponseContext } from '../contexts/ShareContext';


const Add = () => {
  const { addResponse, setAddResponse } = useContext(addResponseContext)

  const [taskData, setTaskData] = useState({
    title: "", desc: "", sDate: "", eDate: ""
  })
  // console.log(taskData);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTaskData({
      title: "", desc: "", sDate: "", eDate: ""
    })
  }
  const handleShow = () => setShow(true);

  const handleAddTask = async () => {
    console.log("inside add button");

    const { title, desc, sDate, eDate } = taskData

    if (title && desc && sDate && eDate) {
      const token = sessionStorage.getItem("token")
      // console.log(token);

      if (token) {
        const reqHeader = {
          'Authorization': `Bearer ${token}`
        }
        // console.log(reqHeader);
        // console.log(taskData);


        try {
          const result = await addTaskAPI(taskData, reqHeader)
          // console.log(result);
          if (result.status == 200) {
            alert(`${result.data.title} added successfully`)
            setAddResponse(result.data)
            handleClose()
          }
          else {
            console.log(result.response.data);

          }

        }
        catch (err) {
          console.log(err);

        }
      }
    }
    else {
      alert("please complete the task details")
    }
  }
  return (
    <>
      {/* <div className="d-flex justify-content-between">
        <h1 className="text-center">All Tasks</h1>
        <button type="button" className=" btn text-white bg-primary fs-3 rounded-circle " onClick={handleShow}><i className="fa-solid fa-plus "></i></button>
      </div> */}

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h1 className="text-center mb-3 mb-md-0">All Tasks</h1>
        <button
          type="button"
          className="btn text-white bg-primary fs-3 rounded-circle"
          onClick={handleShow}
          aria-label="Add new task"
          title="Add a new task"
        >
          <i className="fa-solid fa-plus pt-2"></i>
        </button>
      </div>


      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="mb-2">
              <label >Task Title</label>
              <input type="text" placeholder='complete project' className='form-control' value={taskData.title} onChange={e => setTaskData({ ...taskData, title: e.target.value })} />
            </div>
            <div className="mb-2">
              <label >Task Description</label>
              <input type="text" placeholder='mern stack project' className='form-control' value={taskData.desc} onChange={e => setTaskData({ ...taskData, desc: e.target.value })} />
            </div>
            <div className="mb-2">
              <label >Start Date</label>
              <input type="date" className='form-control' value={taskData.sDate} onChange={e => setTaskData({ ...taskData, sDate: e.target.value })} />
            </div>
            <div className="mb-2">
              <label >End Date</label>
              <input type="date" className='form-control' value={taskData.eDate} onChange={e => setTaskData({ ...taskData, eDate: e.target.value })} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add
