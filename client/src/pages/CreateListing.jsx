import { Button } from 'flowbite-react'
import React from 'react'
import { useState } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user)
  // console.log(files);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    bedrooms: 1,
    bathrooms: 1,
    agent:'',
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const handleImageSubmit = (e) => {
    // 
    if (files.length > 0 && files.length + formData.imageUrls.length < 7){
      // for storing multiple files, where upload is happening 1-1, we need to invoke promises to do that.
      setUploading(true);
      setImageUploadError(false);
      
      const promises = [];

      for (let i=0; i<files.length; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false)
        
      }).catch((error) => {
        setImageUploadError('Image upload failed. Image size more than 2 MB');
      });
    } else{
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    if (
      e.target.type === 'number' ||
      e.target.type === 'text'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }

  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          });
        }
      )
    });

  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      setLoading(true)
      setError(false)
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      console.log(currentUser._id,)
      const data = await res.json();
      setLoading(false)
      if (data.success == false) {
        setError(data.message);
      }
      // navigate(`/listing/${data._id}`)
      navigate('/dashboard')

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }

  }
  return (
    <main className='p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>CreateListing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className='flex flex-col gap-4 flex-1'>
          <input onChange={handleChange} value={formData.name} type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength="10" required/>
          <input onChange={handleChange} value={formData.description} type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required/>
          <input onChange={handleChange} value={formData.address} type="text" placeholder='Address' className='border p-3 rounded-lg' id='address'  required/>
          <input onChange={handleChange} value={formData.agent} type="text" placeholder='Property Manager name' className='border p-3 rounded-lg' id='agent'  required/>
          <div className='flex flex-wrap gap-6 '>
          <div className='flex flex-col items-center gap-2'>
            <input onChange={handleChange} value={formData.bedrooms} type="number" id="bedrooms" min='1' max='20' required className='p-3 border rounded-lg'/>
          <p>Bedrooms</p>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <input onChange={handleChange} value={formData.bathrooms} type="number" id="bathrooms" min='1' max='10' required className='p-3 border rounded-lg'/>
          <p>Bathrooms</p>
          </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold '>Images:
          <span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max 7) </span>
          </p>
          <div className="flex flex-col gap-4">
            <input onChange={(e)=>setFiles(e.target.files)} className="p-3 border rounded w-full" type="file" id='images' accept='image/*' multiple />
            <Button disabled={uploading} type='button' color="blue" onClick={handleImageSubmit}>
              {uploading ? 'Uploading...': 'Upload'}
            </Button>
            <p className='text-red-700 text-sm'>
              {imageUploadError && imageUploadError}
            </p>
            {/* to show the images on the page which will be uploaded.  */}
            {formData.imageUrls.length > 0 &&
             formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
            {/* <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 ' >Upload</button> */}
          </div>
          <button
            disabled={loading || uploading}
            className='p-3 bg-lime-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80' 
          >
            {loading ? 'Creating...' : 'Create Property'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  )
}

