import { Button } from 'flowbite-react'
import React from 'react'
import { useState } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js';


export default function CreateListing() {
  const [files, setFiles] = useState([]);
  // console.log(files);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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
  
  return (
    <main className='p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>CreateListing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className='flex flex-col gap-4 flex-1'>
          <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength="10" required/>
          <input type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required/>
          <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address'  required/>
          <div className='flex flex-wrap gap-6 '>
          <div className='flex flex-col items-center gap-2'>
            <input type="number" id="bedrooms" min='1' max='20' required className='p-3 border rounded-lg'/>
          <p>Beds</p>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <input type="number" id="bathrooms" min='1' max='10' required className='p-3 border rounded-lg'/>
          <p>Baths</p>
          </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold '>Images:
          <span className='font-normal text-gray-700 ml-2'>The first image will be the cover (max10) </span>
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
          <Button>Create Listing</Button>
        </div>
        
      </form>
    </main>
  )
}
