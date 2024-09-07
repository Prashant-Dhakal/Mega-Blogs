import axios from "axios";

const deletePostService = async (slug, data) =>{
    try {
        console.log(data);
        
        const response = await axios.delete(`/user/post/${slug}`);
        if(response){
            return response.data;
        }
    } catch (error) {
    throw new Error("Failed to Delete the post");
    }
}

export {deletePostService}