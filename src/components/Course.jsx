import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Course = () => {
   
    const [course, setCourse] = useState([])
    useEffect(() => {
          axios
            .get("http://127.0.0.1:8000/course/")
            .then((response) => {
                setCourse(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

  return (
    <div id="course">
        <div className='p-3 md:px-20 pt-20 '>
            <div className=''>
                <h1 className='md:text-3xl text-2xl font-bold'>Our most Popular <span>Course</span></h1>
                <p className='text-gray-500 pt-3 text-sm'>Enhance your skills with courses in Web Development, Data Analysis, and Digital Marketing.</p>
            </div>

            <div className='  pt-10 w-full overflow-x-auto h-fit hide-scrollbar  flex '>
                <div className='  gap-8 flex w-max '>
{ course.map((coursers) => (


                <div className=' course' key={coursers.id}>
                    <div className='w-full h-40 bg-white'>
                        <img src={coursers.Course_Img} alt="Course" crossOrigin="anonymous" className='h-full object-cover w-full' />
                    </div>
                    <div className='course_cont'>
                        <h1 className='course_heding'>{coursers.Course_Title}</h1>
                        <p className='course_des'>{coursers.Course_Description}</p>
                        <Link state={{ course: coursers }}  className='h-10' to='/Register'><button  className='b2'>Register</button></Link>
                        
                    </div>
                    </div>
))}
              
            
                </div>
            </div>
        </div>
        </div>
  )
}

export default Course