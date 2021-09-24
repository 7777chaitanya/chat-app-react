import React, {useState, useContext} from 'react';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth, provider} from "../../firebase";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


const Login = () => {

    const [user, setUser] = useContext(CurrentUserContext);
    
    console.log("user => ", user)

    const handleSignInWithGoogle = async (e) =>{
        e.preventDefault();
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setUser(user);
        // console.log(user)
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
      
    }

    return (
        <div>
            <button onClick={handleSignInWithGoogle}>
                Login with google
            </button>
        </div>
    )
}

export default Login
