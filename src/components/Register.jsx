import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
    const location = useLocation();
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
    const {course} = location.state || {};

    useEffect(() => {
      const fetchuser = async () => {
        try {
          const token = localStorage.getItem("access_token");
          if (!token) {
            console.error("❌ No token found! User is not authenticated.");
            return;
          }
    
          const response = await axios.get("http://127.0.0.1:8000/user/", {  // ✅ Correct endpoint
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,  // OR `Token ${token}` if using Django Token Auth
            },
          });
    
          console.log("🧑‍💻 Fetched user:", response.data);
    
          if (!response.data.id) {
            console.error("❌ User ID is missing in response!");
            setUser(null);
          } else {
            setUser(response.data);
          }
        } catch (error) {
          console.error(
            "❌ Error fetching user:",
            error.response ? error.response.data : error.message
          );
          setUser(null);
        }
      };
    
      fetchuser();
    }, []);
    

const subreg = async (data) => {
  try {
    if (!user) {
      console.log("User data not loaded yet");
      return;
    }

    const payload = {
      Course_Title: course.Course_Title, // Ensure it's a number
      user: user.username, // Ensure it's a number
      Phone_num: data.Phone_num,
      Dateof_birth: data.Dateof_birth,
    };

    console.log("📤 Sending data:", payload); // Debug log before sending request

    const response = await axios.post("http://127.0.0.1:8000/register/", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    console.log("✅ Registration successful:", response.data);
    navigate("/");
  } catch (error) {
    console.error("❌ Registration error:", error.response?.data);
  }
};






  return (
    <div>
         <div className="p-3">
        <Link to='/'>
        <FaArrowLeftLong className="text-[#371E80] text-xl" />
        </Link>

        <p className='py-9 text-3xl font-bold'>Register</p>

        <div className='w-full flex justify-center items-center'>
            <div className='md:w-[60%] w-[100%] flex md:flex-row flex-col rounded-md p-2 bg-gray-300'>
                <div className='w-[100%] md:w-[50%] p-3 bg-[#371E80] text-white rounded-md'>
                <p className='font-bold text-2xl pb-4'>{course.Course_Title}</p>
                
<div className='grid grid-cols-2 gap-4 pt-3'>
<div className='info_box col-span-2'>
<h1 className="font-bold ">Course Hour:</h1>
<p className="text-gray-700 text-lg">{course.Course_Hour}</p>
</div>
<div className='info_box'>
<h1 className="font-bold ">Course Price:</h1>
<p className="text-gray-700 text-lg">{course.Course_Price}</p>
</div>

<div className='info_box'>
<h1 className="font-bold ">Course Schedule:</h1>
<p className="text-gray-700 text-lg">{course.Course_Schedule}</p>
</div>

   <div className='col-span-2 info_box'>
<h1 className="font-bold ">Course Description:</h1>
<p className="text-gray-700 text-lg">{course.Course_Description}</p>
 </div>
</div>
                </div>


                <div className='w-[100%] md:w-[50%] p-3 rounded-md'>
                  <form action="" onSubmit={handleSubmit(subreg)} className="space-y-4 md:w-fill w-full">
                  <div>
                    <label htmlFor="Phone_num" className="block font-medium">Phone number</label>
                    <input {...register("Phone_num", { required: "Phone_num is required" })} type="number" className="w-full p-2 border rounded-md"  placeholder="Phone number"/>
                    
                    {errors.Phone_num && <p className="text-red-500 text-sm">{errors.Phone_num.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="Dateof_birth" className="block font-medium">Dateof birth</label>
                    <input {...register("Dateof_birth", { required: "Dateof_birth is required" })} type="date" className="w-full p-2 border rounded-md"  placeholder="Dateof birth"/>
                    
                    {errors.Dateof_birth && <p className="text-red-500 text-sm">{errors.Dateof_birth.message}</p>}
                  </div>

                  <button type="submit" className="w-32 b2">
                  Registerd
                  </button>
                  </form>
                  
                </div>
            </div>
        </div>
         </div>
    </div>
  )
}

export default Register