import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { deleteTaskAPI, updateTaskAPI } from '../services/allAPI';
import { useContext, useState } from 'react';
import { deleteResponseContext, updateResponseContext } from '../contexts/ShareContext';

const TaskCard = ({ task }) => {

    const [taskDetails, setTaskDetails] = useState({
        id: task?._id, title: task?.title, desc: task?.desc, sDate: task?.sDate, eDate: task?.eDate
    })
    console.log(taskDetails);

    const {updateResponse,setUpdateResponse} = useContext(updateResponseContext)
    const { deleteResponse, setDeleteResponse } = useContext(deleteResponseContext)

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setTaskDetails({
            title: task?.title, desc: task?.desc, sDate: task?.sDate, eDate: task?.eDate
        })
    }
    const handleShow = () => {
        setShow(true)
        setTaskDetails({
            title: task?.title, desc: task?.desc, sDate: task?.sDate, eDate: task?.eDate
        })
    }


    const handleDelete = async (tId) => {
        console.log(tId)

        try {

            const token = sessionStorage.getItem("token")
            const reqHeader = {
                'Authorization': `Bearer ${token}`
            }
            const result = await deleteTaskAPI(tId, reqHeader)
            if (result.status == 200) {
                setDeleteResponse(result)
            }
            else {
                console.log(result.response.data);

            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleEditTask = async (tId) => {
        console.log("inside edit task");
        const { title, desc, sDate, eDate } = taskDetails
        // console.log(tId);
        
        if (title && desc && sDate && eDate) {
            //get the token as its update and authentication is required
            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`
                }
                //api call put request
                try {
                    const result = await updateTaskAPI(tId,taskDetails,reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        alert("updated succesfully")
                        handleClose()
                        setUpdateResponse(result)
                    }
                }
                catch (err) {
                    console.log(err);

                }
            }
        }
        else {
            alert("please fill the form correctly")
        }
    }

    return (
        <div>
            <Card style={{ width: '24rem' }}>

                <Card.Body>
                    <h4>{task.title}</h4>
                    <p>Start Date : {task.sDate}</p>
                    <p>End Date : {task.eDate}</p>
                    <Card.Text>
                        {task.desc}
                    </Card.Text>
                    <Button variant="primary" className="rounded-circle me-2" onClick={handleShow}><i className="fa-solid fa-pen"></i></Button>
                    <Button variant="danger" className="rounded-circle" onClick={() => handleDelete(task._id)}><i className="fa-solid fa-trash"></i></Button>
                </Card.Body>
            </Card>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="mb-2">
                            <label >Task Title</label>
                            <input type="text" placeholder='complete project' className='form-control' value={taskDetails.title} onChange={e => setTaskDetails({ ...taskDetails, title: e.target.value })} />
                        </div>
                        <div className="mb-2">
                            <label >Task Description</label>
                            <input type="text" placeholder='mern stack project' className='form-control' value={taskDetails.desc} onChange={e => setTaskDetails({ ...taskDetails, desc: e.target.value })} />
                        </div>
                        <div className="mb-2">
                            <label >Start Date</label>
                            <input type="date" className='form-control' value={taskDetails.sDate} onChange={e => setTaskDetails({ ...taskDetails, sDate: e.target.value })} />
                        </div>
                        <div className="mb-2">
                            <label >End Date</label>
                            <input type="date" className='form-control' value={taskDetails.eDate} onChange={e => setTaskDetails({ ...taskDetails, eDate: e.target.value })} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>handleEditTask(task?._id)}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TaskCard
