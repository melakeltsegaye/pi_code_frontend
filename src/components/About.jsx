import React from 'react'

const About = () => {
  return (
    <div id="about">
        <div className='p-3 md:px-20'>
            <h1 className='lg:text-3xl text-2xl font-bold pb-3'>About <span>us</span></h1>
            <div className='flex flex-col-reverse lg:flex-row bg-none justify-between h-fit w-full  lg:bg-gray-300 '>
                <div className='lg:p-4 px-0 pt-3 lg:pt-0 w-full lg:w-[45%] h-92 flex flex-col justify-center text-start '>
                    <h1 className='lg:text-xl text-md font-bold'>Welcome to π-Code – Your Partner in Growth</h1>
                    <p className='pt-2 text-gray-800'>At π-Code, we provide expert online courses, professional website development, custom software design, and tailored corporate solutions. Whether you're looking to enhance your skills or elevate your business with innovative digital tools, we’re here to help you achieve your goals.</p>
                </div>
                <div className='w-full lg:w-[50%] h-92'>
                    <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='object-cover' alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default About