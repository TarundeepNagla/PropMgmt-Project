import { Modal, Table, Button, TextInput } from 'flowbite-react';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';
import {
  // updateStart,
  // updateSuccess,
  // updateFailure,
  // deleteUserStart,
  // deleteUserSuccess,
  // deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  // const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  // const [imageFileUploadError, setImageFileUploadError] = useState(null);
  // const [imageFileUploading, setImageFileUploading] = useState(false);
  // const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  // const [updateUserError, setUpdateUserError] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  // const [formData, setFormData] = useState({});
  // const dispatch = useDispatch();

  const handleImageChange = (e) => {
    // to upload 1 file only
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  // useEffect(() => {
  //   if (imageFile) {
  //     uploadImage
  //   }
  // }, [imageFile]);

  // const uploadImage = async() => {
  //   console.log('uploading the image...')
  // }

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 text-center font-semibold text-3xl'>Profile (This is Work in Progress ...)</h1>
    <form className='flex flex-col gap-4'>
       {/*upload image functionality which is hidden as this functionality is being called in below div class.  */}
       <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/> 
    
      <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
      <img 
      src={imageFileUrl ||currentUser.profilePicture} 
      alt='user' 
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
      <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span>
    </div>  
    </div>

  )
}
