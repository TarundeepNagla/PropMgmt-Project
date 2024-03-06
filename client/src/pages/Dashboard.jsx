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
  
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    // if tab is not null then execute below condition.
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  
  

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
    <div className='flex flex-col md:flex-row'>
      <div className='md:w-60'> 
        <DashSidebar />
      </div>

      <div className="flex-grow">
        <h1 className='my-7 text-center font-semibold text-3xl'>Welcome! {currentUser.username}</h1>
        <div className="flex flex-wrap justify-center">
          {/* ================= Listed Properties - Card ================= */}
          <div className="max-w-sm mx-4 my-2">
            <Card href={`/listing/${currentUser._id}`} className="ListedProperties">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Listed Properties
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {userTotalListings}
              </p>
            </Card>
          </div>

          {/* ================= Services - Card ================= */}
          <div className="max-w-sm mx-4 my-2">
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Services (WIP)
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {userTotalListings}
              </p>
            </Card>
          </div>

          {/* ================= SOS Help - Card ================= */}
          <div className="max-w-sm mx-4 my-2">
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-red-500 dark:text-white">
                SOS Help
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {userTotalListings}
              </p>
            </Card>
          </div>

          {/* ================= Opened Service Requests - Card ================= */}
          <div className="max-w-sm mx-4 my-2">
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
                Requests Raised
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {userTotalListings}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
    );
}  

        


