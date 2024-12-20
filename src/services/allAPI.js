import serverURL from './serverURL'
import commonAPI from './commonAPI'

// register API 

export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}


//loginAPI 

export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}


//addTaskAPI called by Add component log in required

export const addTaskAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/api/tasks`,reqBody,reqHeader)
}


//get all task - search added
export const getAllTaskAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/api/tasks?search=${searchKey}`,"",reqHeader)
}

//deleteTask called by TaskCard 

export const deleteTaskAPI = async(tId,reqHeader)=>{
    return await commonAPI("DELETE",`${serverURL}/api/tasks/${tId}`,{},reqHeader)
}

//updateTask called by TaskCard

export const updateTaskAPI = async(tId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/api/tasks/${tId}`,reqBody,reqHeader)
}