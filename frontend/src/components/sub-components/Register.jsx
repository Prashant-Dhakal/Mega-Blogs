import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Bgbutton, Input } from "../index.js";
import { useNavigate, Link } from "react-router-dom";
import {registerService} from "../../services/register.services.js"
import { login } from "../../store/AuthSlice.js";
import { useDispatch } from "react-redux";

const Register = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setError("");
    
    try {
      const createdUser = await registerService(data);
      
      if(createdUser){
        console.log(createdUser);

        dispatch(login(data))
      }
      
      navigate("/")

    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="dark:bg-gray-800 h-screen flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:w-7/12 w-8/12 shadow-lg rounded-xl relative p-8">

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="p-12 md:p-24">
          <div className="flex items-center text-lg mb-6 md:mb-8 relative">
            <Input
              placeholder="Username"
              {...register("username", { required: true })}
            />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8 relative">
            <Input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8 relative">
            <Input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>

          <Bgbutton textContent="Sign Up" />

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
