import React, { useEffect } from "react";
import { PostForm } from "../components/index.js";
import { authentication } from "../services/authentication.services.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Addpost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await authentication(dispatch);
        console.log(user);
        
        if (!user) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser()
  }, []);

  return (
    <>
      <div className="w-full h-full py-8">
        <PostForm />
      </div>
    </>
  );
};

export default Addpost;
