import { Modal, Table, Button, TextInput } from 'flowbite-react';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';
import {
  updateStart,
  updateSuccess,
  updateFailure,
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
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // not to refresh the page.
    e.preventDefault(); 
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 text-center font-semibold text-3xl'>Profile (This is Work in Progress ...)</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       {/*upload image functionality which is hidden as this functionality is being called in below div class.  */}
       <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/> 
    
      <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
      <img 
      src={imageFileUrl ||currentUser.profilePicture} 
      alt='user' 
      className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
      </div>
      <TextInput type='text' id='username' placeholder='username'
      defaultValue={currentUser.username}  onChange={handleChange}/> 
      <TextInput type='email' id='email' placeholder='email'
      defaultValue={currentUser.email}  onChange={handleChange}/> 
      <TextInput type='password' id='password' placeholder='password' onChange={handleChange}/> 
      <Button type='submit'>
        Update
      </Button>
      <Link to={'/create-property'}>
      <Button type='button' className='w-full'>
        Add Property
      </Button>
      </Link>
    </form>   
    <div className='text-red-500 flex justify-between mt-5'>
      <span className='cursor-pointer'>Delete Account</span>
      <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span>
    </div> 
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
    </div>

  )
}
