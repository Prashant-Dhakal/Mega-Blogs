import axios from "axios";

const logoutService = async () =>{
    
    const response = await axios.get("/user/logout");
    return response.data;
}

export {logoutService}