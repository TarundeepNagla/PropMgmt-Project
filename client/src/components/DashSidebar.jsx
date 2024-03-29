import { Sidebar } from 'flowbite-react';
import {
    HiUser,
    HiArrowSmRight,
    HiDocumentText,
    HiOutlineUserGroup,
    HiAnnotation,
    HiOutlinePlusCircle,
    HiOutlineHome ,
    HiOutlineUser ,
    HiOutlineClipboardList ,
    HiChartPie,
} from 'react-icons/hi';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const {currentUser} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        // if tab is not null then execute below condition.
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

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
        <div>
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-5'>

                    <Link to={`/dashboard/${currentUser._id}`}>
                    <Sidebar.Item 
                    active={tab=='dashboard'} 
                    icon={HiChartPie} 
                    label={currentUser.isAdmin ? 'Admin': 'User'} 
                    labelColor="dark"
                    as='div'>
                        Dashboard
                    </Sidebar.Item>
                    </Link>

                    {/* <Link to="/dashboard?tab=profile"> */}
                    <Link to="/profile">
                    <Sidebar.Item 
                    active={tab=='profile'} 
                    icon={HiUser} 
                    label={currentUser.isAdmin ? 'Admin': 'User'} 
                    labelColor="dark"
                    as='div'>
                        Profile
                    </Sidebar.Item>
                    </Link>
                    {/* <Link to="/myproperty"> */}
                    <Link to={`/listing/${currentUser._id}`}>
                    <Sidebar.Item 
                    active={tab=='listings'} 
                    icon={HiOutlineHome} 
                    label={""} 
                    labelColor="dark"
                    as='div'>
                        View My Listings
                    </Sidebar.Item>
                    </Link>
                    
                    {currentUser.isAdmin && (  
                        <Link to='/create-listing'>
                        <Sidebar.Item 
                        icon={HiOutlinePlusCircle} 
                        label={currentUser.isAdmin ? 'Admin': 'User'}
                        labelColor="dark"
                        as='div'>
                            Add A Property
                        </Sidebar.Item>
                        </Link>
                    )}

                    {currentUser.isAdmin && (  
                        <Link to='/create-agent'>
                        <Sidebar.Item 
                        icon={HiOutlinePlusCircle} 
                        label={currentUser.isAdmin ? 'Admin': 'User'}
                        labelColor="dark"
                        as='div'>
                            Add Service Agent
                        </Sidebar.Item>
                        </Link>
                    )}

                    <Link to="/dashboard?tab=myagent">
                    <Sidebar.Item 
                    active={tab=='myagent'} 
                    icon={HiOutlineUser } 
                    label={""} 
                    labelColor="dark"
                    as='div'>
                        My Property Manager
                    </Sidebar.Item>
                    </Link>


                    <Link to={`/services/${currentUser._id}`}>
                    <Sidebar.Item 
                    active={tab=='services'} 
                    icon={HiOutlineClipboardList  } 
                    label={""} 
                    labelColor="dark"
                    as='div'>
                       Book a Service
                    </Sidebar.Item>
                    </Link>

                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
        </div>
    )
};