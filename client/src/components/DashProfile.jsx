import { Modal, Table, Button, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  // const [userPosts, setUserPosts] = useState([]);
  // const [showMore, setShowMore] = useState(true);
  // const [showModal, setShowModal] = useState(false);
  // const [postIdToDelete, setPostIdToDelete] = useState('');
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
    <form className='flex flex-col'> 
      <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
      <img src={currentUser.profilePicture} alt='user' 
      className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
      </div>
      <TextInput type='text' id='username' placeholder='username'
      defaultValue={currentUser.username} /> 
      <TextInput type='email' id='email' placeholder='email'
      defaultValue={currentUser.email} /> 
      <TextInput type='password' id='password' placeholder='password'/> 
      <Button type='submit'>
        Update
      </Button>
    </form>   
    <div className='text-red-500 flex justify-between mt-5'>
      <span className='cursor-pointer'>Delete Account</span>
      <span className='cursor-pointer'>Sign Out</span>
    </div>  
    </div>

  )
}
