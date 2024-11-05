import axios from "axios"

const commonAPI = async(httpMethod,url,reqBody,reqHeader)=>{
    const reqConfig = {
        method: httpMethod,
        url,
        data:reqBody,
        headers: {
            'Content-Type': 'application/json',  // Default Content-Type header
            ...reqHeader  // Merge with any additional headers
        }    }

    return await axios(reqConfig).then(res=>{
        return  res
    }).catch(err=>{
        return  err
    })
}

export default commonAPI