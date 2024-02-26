import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput, Alert, Spinner} from 'flowbite-react';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';


export default function SignIn() {
  const [formData, setFormData] = useState({}); // Initial state is an empty object
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {loading, error: errorMessage } = useSelector(state=> state.user);
  // To initialize the user slice imported (SignInStart, success and failure), we use dispath.
  const dispatch = useDispatch();
  const navigate = useNavigate(); // initialization of useNavigate
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('All fields are mandatory'));
    }
    try {
        // setLoading(true); // means fetching of data from API is in progress.
        // setErrorMessage(null); // cleanup previous error messages
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false){
        // return setErrorMessage(data.message); == instead of this, we are using below redux dispatch function
        dispatch(signInFailure(data.message));

      }
      
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl gap-7 mx-auto flex-col md:flex-row md:items-center'>
        {/* left side */}
        <div className='flex-1'>
          <Link 
          to='/'
          className='text-3xl font-bold dark:text-white' >
            <span className='px-2 py-1' color='blue' outlined >
              Welcome to
            </span>
          Property Management
          </Link>
          <p className='text-sm mt-5'>
            You can sign in with your email and password
          </p>
        </div>
        {/* right side */}

        <div className='flex-1'>
          <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <div>
            <Label value="Your Email" />
            <TextInput
              type='email'
              placeholder='Enter your email adddress'
              id='email'
              required 
              onChange={handleChange}
            />
            <div>
            <Label value="Password" />
            <TextInput
              type='password'
              placeholder='*******'
              id='password'
              required 
              onChange={handleChange}
            />
            </div>
            </div>
            {/* when loading is in progress, disable the button */}
            <Button type='submit' gradientDuoTone="greenToBlue" disabled={loading}> 
              {
                loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'> Loading .....</span>
                  </>
                ) : 'Sign In'
                
              }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont have an account?</span>
            <Link 
              to="/signup"
              className='text-blue-500' >
                Sign-Up

              </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
    
  )
}
