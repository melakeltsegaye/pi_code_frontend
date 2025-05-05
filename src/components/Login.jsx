import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import {useForm} from 'react-hook-form';
import { Link} from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    setLoginError(""); // Reset error message before new attempt

    const success = await login(data.username, data.password);
    if (success) {
      navigate("/"); // ✅ Redirect on successful login
    } else {
      setLoginError("Invalid username or password."); // ❌ Show error if login fails
    }
  };

  return (
    <div className='w-full h-screen'>
      <div className='w-full h-full flex items-center justify-center  '>
                  <div className='w-full h-full p-2 md:w-[70%] md:flex md:justify-between md:h-[80%] rounded-md bg-gray-200 shadow-xl'>
                      <div className='h-full bg-[#4828a8] rounded-md w-[45%] hidden md:flex p-3 md:flex-col text-white' >
                      <Link className='hover:text-white' to='/'><h1 className=' font-title text-lg md:text-2xl font-bold '>π-code</h1></Link>
                 <div className='pt-20'>
                      <h1 className='text-4xl text-center font-bold'>Login </h1>
                      <p className='pt-10 text-lg '>Login to register for the courses and gain access to services designed to meet your needs.</p>
                      </div> 
                      </div>
      
                      <Link className='hover:text-white' to='/'><FaArrowLeftLong className='block md:hidden text-4xl py-3 font-bold t_color' /></Link>
                      <h1 className='block md:hidden text-2xl font-bold pt-5'>Login</h1>
                <div className='md:w-[50%] h-full flex items-start md:pt-0 pt-10 md:items-center md:justify-center'>
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 md:w-[80%] w-full">
                  <div>
                    <label htmlFor="username" className="block font-medium">Username</label>
                    <input {...register("username", { required: "Username is required" })} type="text" className="w-full p-2 border rounded-md"  placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                  </div>
      
                      <div>
                        <label htmlFor="password" className="block font-medium">Password</label>
                        <input {...register("password", { required: "Password is required" })} className="w-full p-2 border rounded-md" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                      </div>
      
                      {loginError && <p className="text-red-500 text-sm">{loginError}</p>} {/* ✅ Show error when login fails */}
    
      
                  <button type="submit" className="w-32 b2">
                  Login
                  </button>
                </form>
                      </div>
                  </div>
              </div>
    
    </div>
  );
};

export default Login;
