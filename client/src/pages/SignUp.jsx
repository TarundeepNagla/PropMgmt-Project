import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';


export default function SignUp() {
  const [formData, setFormData] = useState({}); // Initial state is an empty object
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    } catch (error) {
      // console.error('Error occurred during sign-up:', error);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl gap-7 mx-auto flex-col md:flex-row md:items-center'>
        {/* left side */}
        <div className='flex-1'>
          <Link 
          to='/'
          className='text-3xl font-bold dark:text-white' >
            <span className='px-2 py-1' color='blue' outlined >
              Welcome to
            </span>
          Property Management
          </Link>
          <p className='text-sm mt-5'>
            This is a project on property management 
          </p>
        </div>
        {/* right side */}

        <div className='flex-1'>
          <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <div>
            <Label value="Your Username" />
            <TextInput
              type='text'
              placeholder='Enter your username'
              id='username'
              required 
              onChange={handleChange}
            />
            </div>
            <div>
            <Label value="Your Email" />
            <TextInput
              type='email'
              placeholder='Enter your email adddress'
              id='email'
              required 
              onChange={handleChange}
            />
            <div>
            <Label value="Password" />
            <TextInput
              type='password'
              placeholder='Enter your Password'
              id='password'
              required 
              onChange={handleChange}
            />
            </div>
            </div>
            <Button type='submit' gradientDuoTone="greenToBlue">
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link 
              to="/signin"
              className='text-blue-500' >
                Sign-in

              </Link>
          </div>
        </div>
      </div>
    </div>
    
  )
}
