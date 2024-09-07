import axios from "axios";

const getSinglePost = async (slug) => {
  try {
    // console.log(slug);
    
    const response = await axios.get(`/user/post/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch the post");
  }
};

export { getSinglePost };
