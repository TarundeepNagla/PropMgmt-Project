import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import { useSelector } from 'react-redux';

export default function App() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        
        <Route path='/about' element={<About />} />
        {/* create private routes for this to be accessible only when user is logged. */}
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        {/* <Route path={`/listing/${currentUser.id}`} element={<Listing />}/> */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
