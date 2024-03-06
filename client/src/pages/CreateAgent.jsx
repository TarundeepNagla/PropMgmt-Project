import { Button } from 'flowbite-react'
import React from 'react'
import { useState } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function CreateAgent() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user)
  // console.log(files);
  const [formData, setFormData] = useState({
    agentPicture: [],
    agentname: '',
    agentcompany: '',
    agentemail: '',
    agentphone: '',
    agentaddress: '',
    agentIdproof: '',
    service:'',
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [success, setSuccess] = useState(false);

  console.log(formData);

//   const handleImageSubmit = (e) => {
//     // to upload 1 file only
//     const file = e.target.files;
//     if (file) {
//       setImageFile(file);
//       setImageFileUrl(URL.createObjectURL(file));
//     }
    
    
//   };

  const handleImageSubmit = (e) => {
    // 
    if (files.length > 0 && files.length + formData.agentPicture.length < 2){
      // for storing multiple files, where upload is happening 1-1, we need to invoke promises to do that.
      setUploading(true);
      setImageUploadError(false);
      
      const promises = [];

      for (let i=0; i<files.length; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({...formData, agentPicture: formData.agentPicture.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false)
        
      }).catch((error) => {
        setImageUploadError('Image upload failed. Image size more than 2 MB');
      });
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
      agentPicture: formData.agentPicture.filter((_, i) => i !== index),
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.agentPicture.length < 1)
        return setError('You must upload at least one image');
      setLoading(true)
      setError(false)
    
      // Convert agentPicture array to a string
      const agentPictureString = formData.agentPicture.join(',');

      const res = await fetch('/api/agent/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          agentPicture: agentPictureString,
          createdByUser: currentUser._id,
        }),
      });
      
      const data = await res.json();
      setLoading(false)
    //   navigate('/')
      if (data.success == false) {
        setError(data.message);
      }
      

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }

  }
  return (
    <main className='p-3 max-w-xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Add Agent Details</h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className='flex flex-col gap-4 flex-1'>
          <input onChange={handleChange} value={formData.agentname} type="text" placeholder='Name' className='border p-3 rounded-lg' id='agentname' maxLength='15' minLength="6" required/>
          <input onChange={handleChange} value={formData.agentcompany} type="text" placeholder='Company Name' className='border p-3 rounded-lg' id='agentcompany' />
          <input onChange={handleChange} value={formData.agentemail} type="text" placeholder='Email address' className='border p-3 rounded-lg' id='agentemail' />
          <input onChange={handleChange} value={formData.agentphone} type="text" placeholder='Phone Number' className='border p-3 rounded-lg' id='agentphone' required />
          <input onChange={handleChange} value={formData.agentaddress} type="text" placeholder='Address' className='border p-3 rounded-lg' id='agentaddress'  required/>
          <input onChange={handleChange} value={formData.agentIdproof} type="text" placeholder='Address Proof ID' className='border p-3 rounded-lg' id='agentIdproof'  required/>
          <input onChange={handleChange} value={formData.service} type="text" placeholder='Service Type' className='border p-3 rounded-lg' id='service'  required/>
          {/* <div className='flex flex-wrap gap-6 '> */}
          {/* <div className='flex flex-col items-center gap-2'>
            <input onChange={handleChange} value={formData.bedrooms} type="number" id="bedrooms" min='1' max='20' required className='p-3 border rounded-lg'/>
          <p>Bedrooms</p>
          </div> */}
          {/* <div className='flex flex-col items-center gap-2'>
            <input onChange={handleChange} value={formData.bathrooms} type="number" id="bathrooms" min='1' max='10' required className='p-3 border rounded-lg'/>
          <p>Bathrooms</p>
          </div> */}
          {/* </div> */}
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold '>Profile Image:
          <span className='font-normal text-gray-700 ml-2'>Upload Agent profile picture </span>
          </p>
          <div className="flex flex-col gap-4">
            <input onChange={(e)=>setFiles(e.target.files)} className="p-3 border rounded w-full" type="file" id='agentPicture' accept='image/*' multiple />
            <Button disabled={uploading} type='button' color="blue" onClick={handleImageSubmit}>
              {uploading ? 'Uploading...': 'Upload Image'}
            </Button>
            <p className='text-red-700 text-sm'>
              {imageUploadError && imageUploadError}
            </p>
            {/* to show the images on the page which will be uploaded.  */}
            {formData.agentPicture.length > 0 &&
             formData.agentPicture.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='agentPicture'
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
            {loading ? 'Creating...' : 'Add Agent Details'}
            {success && <p className='text-green-700 text-center'>Details successfully updated in database</p>}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  )
}
