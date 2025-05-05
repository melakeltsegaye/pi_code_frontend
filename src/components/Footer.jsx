import React from 'react'
import { FaInstagram, FaWhatsapp, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
        <div className='w-full bg-[#525FE1] p-3 lg:px-20 md:px-10 text-white'>
            <div className='flex justify-between w-full md:py-20 md:flex-row flex-col-reverse items-center '>
                <div className='py-20 md:py-0 text-center'>
                    <h1 className='md:text-3xl text-2xl font-bold md:pb-4 pb-2'>π-Code</h1>
                    <p>You can find us via</p>
                    <p>Phone: 0903805003 / 0712590965</p>
                    <div className='flex gap-3 pt-3 text-3xl justify-center'>
                    <FaInstagram />
                    <FaWhatsapp />
                    <FaLinkedinIn />
                    <FaTelegramPlane />
                    </div>
                </div>
                <div className='flex flex-wrap gap-5 md:gap-32 w-full justify-center'>
                    <div>
                        <h1 className='md:text-3xl text-2xl font-bold'>Services</h1>
                        <p>software design</p>
                        <p>website development</p>
                        <p>corporate solutions</p>
                        <p>Advertisement</p>
                    </div>
                    <div>
                        <h1 className='md:text-3xl text-2xl font-bold'>Courses</h1>
                        <p>Data Analysis</p>
                        <p>Digital Marketing</p>
                        <p>Web Development</p>
                    </div>
                </div>
            </div>

            <div className='border-t flex items-center justify-center'>
                <h1>© 2024 π-Code Technology Learning Hub. All rights reserved.</h1>
            </div>
        </div>
    </div>
  )
}

export default Footer