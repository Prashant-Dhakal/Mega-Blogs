import axios from 'axios';

const registerService = async (data) => {
  const response = await axios.post("/user/register", data);
  
  return response.data;
};

export {registerService}
