import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { TbWorldWww } from "react-icons/tb";
import { BsSuitcaseLg, BsPalette } from "react-icons/bs";

const Services = () => {
    const [service, setService] = useState([])

    useEffect(() => {
        axios
          .get("http://127.0.0.1:8000/service/")
          .then((response) => {
            setService(response.data); 
          })
          .catch((error) => console.error("Error fetching data:", error));
      });


  return (
    <div id="services">
        <div className='p-0 md:px-20 py-20 h-fit'>
            <div className='pb-5 md:px-0 px-3'>
                <h1 className='md:text-3xl text-2xl font-bold'>Our Additional <span>Services</span></h1>
                <p className='text-gray-500 pt-3 text-sm'>We offer website development, software design, and corporate solutions.</p>
            </div>
            {service.map((service) => (
            <div className='bg-gray-300 w-full p-2 md:p-5 h-fit flex  gap-4 '>
                <div className='w-full bg-white rounded-md p-3 min-h-32 max-h-fit flex flex-col items-center md:flex-row gap-3'>
                    <div className='h-fit w-full md:w-[12%]  flex justify-center items-center p-4'>
                        <img className='w-full h-20 object-cover' src={service.Servise_Img} alt="" /></div>
                    <div className='md:w-[80%] w-full  md:text-start text-center'>
                        <h1 className='md:text-2xl text-md font-bold'>{service.Servise_Title}</h1>
                        <p className='pt-2 md:text-1xl text-sm'>{service.Servise_Description}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Services