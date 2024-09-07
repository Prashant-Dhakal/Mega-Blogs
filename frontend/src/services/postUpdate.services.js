import axios from "axios";

const postUpdate = async (slug, data) =>{
    try {
        console.log(data);
        
        const response = await axios.patch(`/user/post/updation/${slug}`, data);
        if(response){
            return response.data;
        }
    } catch (error) {
    throw new Error("Failed to update the postTitle");
    }
}

export {postUpdate}