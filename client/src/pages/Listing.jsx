import {  Button, TextInput } from 'flowbite-react';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';
// import {
//   updateStart,
//   updateSuccess,
//   updateFailure,
//   // deleteUserStart,
//   // deleteUserSuccess,
//   // deleteUserFailure,
//   signoutSuccess,
// } from '../redux/user/userSlice';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [showListingsError, setshowListingsError] = useState(false);
  const filePickerRef = useRef();
  // const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  // const [imageFileUploadError, setImageFileUploadError] = useState(null);
  // const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [userListings, setUserListings] = useState([]);

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

  // const handleSignout = async () => {
  //   try {
  //     const res = await fetch('/api/user/signout', {
  //       method: 'POST',
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       console.log(data.message);
  //     } else {
  //       dispatch(signoutSuccess());
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

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

  const handleShowListings = async () => {
    try {
      setshowListingsError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`)
      const data = await res.json();
      if (data.success == false){
        setshowListingsError(true);
        return
      }
      // to store the listing data.
      setUserListings(data);
    } catch (error) {
      setshowListingsError(true);
    }
  }


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
    <h1 className='my-7 text-center font-semibold text-3xl'>My Property Listing</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       {/*upload image functionality which is hidden as this functionality is being called in below div class.  */}
       <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/> 
    
      <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>
      <img 
      src={imageFileUrl ||currentUser.profilePicture} 
      alt='user' 
      className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
      </div>
      {/* <TextInput type='text' id='username' placeholder='username'
      defaultValue={currentUser.username}  onChange={handleChange}/> 
      <TextInput type='email' id='email' placeholder='email'
      defaultValue={currentUser.email}  onChange={handleChange}/> 
      <TextInput type='password' id='password' placeholder='password' onChange={handleChange}/>  */}
      {/* <Button className='rounded-full' type='submit'>
        Update
      </Button>
      <Link to={'/create-listing'}>
      <Button type='button' className='rounded-full w-full'>
        Add Property
      </Button>
      </Link> */}
    </form>   
    <div className='text-red-500 flex justify-between mt-5'>
      {/* <span className='cursor-pointer'>Delete Account</span> */}
      {/* <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span> */}
    </div> 
    
      <Button onClick={handleShowListings} type='button' gradientDuoTone="greenToBlue" className='rounded-full w-full'>
        Show Listing
      </Button>
      
      <p>
        {showListingsError ? 'Error showing listings': ''}
      </p>

      {/* to show the listings */}

      {userListings && userListings.length > 0 &&

    
      userListings.map((listing) => (
          <div key={listing._id} className="border rounded-lg p-3 flex justify-between item-center gap-4">
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain'/>
            </Link>
            <Link className="'text-slate-700 font-semibold  hover:underline truncate flex-1" to={`/listing/${listing._id}`}>
              <p>{listing.name}</p>
            </Link>
            <div className="flex flex-col">
              <button className="text-red-600">Delete</button>
              <button className="text-black-600">Edit</button>
            </div>

          </div>
      ))

      }

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
