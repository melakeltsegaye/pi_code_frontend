import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/contact/', form);  // Make sure this matches your Django endpoint
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message');
    }
  };

  return (
    <div id="contact">
      <div className='p-3 md:px-20 py-20 w-full flex flex-col items-center'>
        <h1 className='md:text-3xl text-2xl font-bold pb-5'>Contact <span>Us</span></h1>
        <div className='border border-[#371E80] p-4 rounded-md w-full md:w-[30rem] h-fit'>
          <form className='flex gap-3 flex-col w-full' onSubmit={handleSubmit}>
            <label className='font-bold text-lg'>Name</label>
            <input
              name="name"
              type="text"
              placeholder='Name'
              value={form.name}
              onChange={handleChange}
              className='w-full bg-gray-200 placeholder:text-[#371E80] border border-[#371E80] rounded-md p-3'
              required
            />
            <label className='font-bold text-lg'>Email</label>
            <input
              name="email"
              type="email"
              placeholder='Email'
              value={form.email}
              onChange={handleChange}
              className='w-full bg-gray-200 placeholder:text-[#371E80] border border-[#371E80] rounded-md p-3'
              required
            />
            <label className='font-bold text-lg'>Message</label>
            <textarea
              name="message"
              placeholder='Message'
              value={form.message}
              onChange={handleChange}
              className='w-full bg-gray-200 placeholder:text-[#371E80] border border-[#371E80] rounded-md p-3'
              required
            />
            <button type="submit" className='b2'>Submit</button>
            {status && <p className="text-green-600 font-bold">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
