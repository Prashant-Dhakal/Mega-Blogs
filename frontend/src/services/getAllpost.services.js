import axios from 'axios';

const getAllpostServices = async () => {
  const response = await axios.get("/user/getallPost");
  
  return response.data;
};

export {getAllpostServices}
