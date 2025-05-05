import React, { useState, useEffect, useContext} from 'react';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FaBars } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import AuthContext from "../context/AuthContext";



const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate(); // Use navigate inside the component

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsAuth(true);
    }
  }, []);


  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent default link behavior

    await logout(); // Call logout function from AuthContext

    navigate("/login"); // Redirect after logout
  };


  
  return (
    <div className=' p-3 md:px-20 '>
        <div className='w-full flex justify-between items-center'>
        <h1 className=' font-title text-2xl md:text-3xl font-bold t_color'>π-code</h1>

        <div className=' text-[0.99rem] md:flex gap-8 hidden justify-between items-center'>
        <AnchorLink href="#services">Services</AnchorLink>
          <AnchorLink href="#contact">Contact</AnchorLink>
          <AnchorLink href="#about">About</AnchorLink>
          <AnchorLink href="#course">Course</AnchorLink>
        </div>
      
        <div>
       
        {isAuth ? (
        <button className='b2 md:block hidden' onClick={handleLogout}>Logout</button> 
      ) : (
        <div className='flex gap-2'>
          <Link to='signup'><button className='t_color text-md md:block hidden b1 cursor-pointer'>Sign up</button></Link>
          <Link to="/login"><button className='text-md md:block hidden b2 cursor-pointer'>Login</button></Link>
        </div>
      )}
            <FaBars className='text-2xl t_color md:hidden cursor-pointer' onClick={() => setNavOpen(true)} />
        </div>
       
        
        </div>

        <div className={ navOpen  ? 'fixed top-0 left-0 w-full h-full z-10 bg-white ' : 'hidden' }>
          <div className=' flex justify-between p-3 items-center'>  
          <h1 className=' font-title text-2xl md:text-3xl font-bold t_color'>π-code</h1>
        <IoMdClose onClick={() => setNavOpen(false)} className=' cursor-pointer text-3xl' />
          </div>

          <div className='w-full flex flex-col items-center justify-center ' onClick={() => setNavOpen(false)}>
          <AnchorLink className=' anch' href="#services">Services</AnchorLink>
          <AnchorLink className=' anch' href="#course">Course</AnchorLink>
          <AnchorLink className=' anch' href="#about">About</AnchorLink>
          <AnchorLink className=' anch' href="#contact">Contact</AnchorLink>
          {isAuth ? (
            <div className='py-3 w-full'>
<button className='b2 w-full' onClick={handleLogout}>Logout</button>
            </div> // ✅ Use button instead of Link
      ) : (
        <div className='flex gap-2 py-3'>
          <Link to='signup'><button className='t_color text-md  b1 cursor-pointer'>Sign up</button></Link>
          <Link to="/login"><button className='text-md  b2 cursor-pointer'>Login</button></Link>
        </div>
      )}
          </div>
        </div>

    </div>
  )
}

export default Navigation