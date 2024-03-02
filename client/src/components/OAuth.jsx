import React from 'react'
import { Button, Label, TextInput, Alert, Spinner} from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app) // app - is default exported from firebase.js 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        // Below code helps to always pop up user to select the google account for login, even through he has added previously only single account.
        provider.setCustomParameters({ prompt: 'select_account'})
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            //  update response payload received from google (user, photo) to database
            //  below code sents POST (POST - sending data to server) request to '/api/auth/google' 
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            const data = await res.json() // to convert data to JSON format.
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
            
        }
    }
  return (
    <Button type='button' gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6'/>
        Signin with Google
    </Button>
  )
}
