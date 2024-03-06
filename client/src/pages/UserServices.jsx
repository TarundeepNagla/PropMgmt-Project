import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // useLocation is to utilize (tab=profile ..etc) in URL address bar.
import { useSelector } from 'react-redux';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashUsers from '../components/DashUsers';
import DashAgent from '../components/Dashboardagent';
import DashServices from '../components/Dashboardservices';
import Listing from './Listing';
import { current } from '@reduxjs/toolkit';
import { Button } from 'flowbite-react'
import React from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';

// import DashboardPage from './DashboardPage';
// import Listing from './pages/Listing';

export default function Dashboard() {
  const location = useLocation();
  const {currentUser} = useSelector(state => state.user)
  const [userTotalListings, setUserTotalListings] = useState(0);
  const [showListingsError, setshowListingsError] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() =>{
    const showTotallistings = async () => {
      try {
        setshowListingsError(false);
        const res = await fetch(`/api/user/totallisting/${currentUser._id}`)
        const data = await res.json();
        console.log('API response:',data)
        if (data.success == false){
          setshowListingsError(true);
          console.log(userTotalListings)
          return;
        }
        // to store the listing data.
        setUserTotalListings(data);
      } catch (error) {
        setshowListingsError(true);
      }
    };
    showTotallistings();
  },[currentUser._id]); 

  


    return(

      <section>
        <div className="cont">
          <div className="xl:w-[470px] mx-auto">
            <h2 className='heading text-center font-bold uppercase'>Book Your Service</h2>
            
            



          </div>
        </div>
      </section>


    // <div className='flex flex-col md:flex-row'>
    //   <div className='md:w-60'> 
    //     <DashSidebar />
    //   </div>
    //   {/* Heading Title */}
    //   <div className="flex-grow">
    //     <h1 className='my-7 text-center  font-semibold text-3xl'>Service Booked for: {currentUser.username}</h1>
    //   </div>

    //   {/*  */}
      
    // </div>
    );
}  

        


