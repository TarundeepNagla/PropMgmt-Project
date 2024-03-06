import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Projects from './pages/Projects';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Updatelisting from './pages/Updatelisting';
import UserProfile from './pages/UserProfile'
import Dashboard from './pages/Dashboard';
import UserServices from './pages/UserServices'
import CreateAgent from './pages/CreateAgent'


export default function App() {
  
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        
        <Route path='/about' element={<About />} />
        {/* create private routes for this to be accessible only when user is logged. */}
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard/:dashId' element={<Dashboard />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/update-listing/:listingId' element={<Updatelisting />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/services/:serviceId' element={<UserServices />} />
          <Route path='/create-agent' element={<CreateAgent />} />

        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
