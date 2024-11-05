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
    return await commonAPI("POST",`${serverURL}/add-task`,reqBody,reqHeader)
}

//getAllTask called by dashbaord

export const getAllTaskAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/get-AllTask`,"",reqHeader)
}

//deleteTask called by TaskCard 

export const deleteTaskAPI = async(tId,reqHeader)=>{
    return await commonAPI("DELETE",`${serverURL}/${tId}/delete-task`,{},reqHeader)
}

//updateTask called by TaskCard

export const updateTaskAPI = async(tId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/${tId}/update-task`,reqBody,reqHeader)
}