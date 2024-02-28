import { Button } from 'flowbite-react'
import React from 'react'


export default function CreateListing() {
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
            <input className="p-3 border rounded w-full" type="file" id='images' accept='image/*' multiple />
            <Button color="blue">Upload</Button>
            {/* <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 ' >Upload</button> */}
          </div>
          <Button>Create Listing</Button>
        </div>
      </form>
    </main>
  )
}

