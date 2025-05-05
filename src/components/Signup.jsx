import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeftLong } from "react-icons/fa6";
import {useForm} from 'react-hook-form';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {user} = location.state || {};

  const {
    register,
    handleSubmit,
    setValue,  
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: user || {}, // Prefill with user data if exists
  });

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => {
        setValue(key, user[key]);
      });
    }
  }, [user, setValue]);


  const onUpdate = async (data) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/usersupdate/${user.id}/`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log(response);  // Add this line to see the complete response
      alert(response.data?.message || "User updated successfully!");
      navigate("/"); // Redirect after update
    } catch (error) {
      console.error("Update error:", error.response);  // Log the error response
      navigate("/"); 
    }
  };
  




  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000", 
        data, 
        {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message || "Signup successful!");
      window.location.href = "/";
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "An error occurred");
      } else {
        alert("Unable to connect to the server.");
      }
    }
  };


  return (
    <div className='w-full h-screen'>
        <div className='w-full h-full flex items-center justify-center  '>
            <div className='w-full h-full p-2 md:w-[70%] md:flex md:justify-between md:h-[80%] rounded-md bg-gray-200 shadow-xl'>
                <div className='h-full bg-[#4828a8] rounded-md w-[45%] hidden md:flex p-3 md:flex-col text-white' >
                <Link className='hover:text-white' to='/'><h1 className=' font-title text-lg md:text-2xl font-bold '>π-code</h1></Link>
                { user ? (<div className='pt-20'>
                <h1 className='text-4xl text-center font-bold'>update user</h1>
                </div>) : (<div className='pt-20'>
                <h1 className='text-4xl text-center font-bold'>Sign up and register for the courses</h1>
                <p className='pt-10 text-lg '>Sign up now to register for the courses and gain access to services designed to meet your needs.</p>
                </div>)}
                

                
                </div>



                <Link className='hover:text-white' to='/'><FaArrowLeftLong className='block md:hidden text-4xl py-3 font-bold t_color' /></Link>
                <h1 className='block md:hidden text-2xl font-bold pt-5'>Sign up</h1>
          <div className='md:w-[50%] h-full flex items-start md:pt-0 pt-10 md:items-center md:justify-center'>
          <form onSubmit={handleSubmit(user ? onUpdate : onSubmit)} className="space-y-4 md:w-[80%] w-full">
            <div>
              <label htmlFor="username" className="block font-medium">Username</label>
              <input {...register("username", { required: "Username is required" })} type="text" id="username" className="w-full p-2 border rounded-md" placeholder='Name' />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block font-medium">Email</label>
              <input {...register("email", { required: "Email is required" })} type="email" id="email" className="w-full p-2 border rounded-md" placeholder='abc@gmail.com'  />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {!user && (
              <>
                <div>
                  <label htmlFor="password" className="block font-medium">Password</label>
                  <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })} type="password" id="password" className="w-full p-2 border rounded-md" placeholder='Password' />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block font-medium">Confirm Password</label>
                  <input {...register("confirmPassword", { required: "Confirm your password", validate: (value) => value === watch("password") || "Passwords do not match" })} type="password" id="confirmPassword" className="w-full p-2 border rounded-md" placeholder='Confirm' />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
              </>
            )}

            <button type="submit" className="w-32 b2">
              {user ? "Update" : "Sign Up"}
            </button>
          </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup