import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // useLocation is to utilize (tab=profile ..etc) in URL address bar.
import { useSelector } from 'react-redux';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashUsers from '../components/DashUsers';
import DashAgent from '../components/Dashboardagent';
import DashServices from '../components/Dashboardservices';
// import Listing from './pages/Listing';

export default function Dashboard() {
  const location = useLocation();
  const {currentUser} = useSelector(state => state.user)
  
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    // if tab is not null then execute below condition.
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* posts... */}
      {/* {tab === 'posts' && <DashPosts />} */}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      {/* property  */}
      {tab === `/listing/${currentUser._id}` && <Listing />}
      {/* myagent */}
      {tab === 'myagent' && <DashAgent />}
      {/* services */}
      {tab === 'services' && <DashServices />}
    </div>
  );
};