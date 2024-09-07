import axios from "axios";

const loginService = async (data) =>{
    
    const response = await axios.post("/user/login", data);
    return response.data;
}

export {loginService}