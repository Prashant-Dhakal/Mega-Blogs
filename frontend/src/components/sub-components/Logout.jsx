import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutService } from "../../services/logout.services";
import {logout} from "../../store/AuthSlice.js"
import { useDispatch } from "react-redux";

const Logout = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const logoutHandler = async () => {
    try {
      const logoutUser = await logoutService();
      
      if(logoutUser){
        console.log(logoutUser);

        dispatch(logout())
      }
      
      navigate("/")

    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <button
        onClick={logoutHandler}
        type="button"
        className="px-6 py-2 min-w-[120px] text-center text-white border border-violet-600 rounded focus:ring"
      >
        Logout
      </button>
      <Link
        to="addpost"
        className="p-3 bg-emerald-300 rounded cursor-pointer hover:bg-green-800"
      >
        Upload Post
      </Link>
    </>
  );
};

export default Logout;
