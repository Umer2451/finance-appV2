import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, addUserData } from './loginSlice';
import firebaseApp from './firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";  // Ensure this path is correct
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const data = useSelector(state => state.loginData);
  const userData = useSelector(state => state.userData);
  const navigate = useNavigate();

  function navigateToHome(event) {
    event.preventDefault(); 
    navigate('/home'); 
  }

  const dispatch = useDispatch();
  const [username, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [myUserData, setUserData] = useState('');
  const auth = getAuth(firebaseApp);

  const onChangeUserEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const onChangeUserPassword = (event) => {
    setUserPassword(event.target.value);
  };

  const handleLoginData = (event) => {
    dispatch(addUser({username: username, password: password}));
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
        const user = userCredential.user;
        setUserData({userData: userCredential});
        dispatch(addUserData({data: userCredential}));
        const currentUser = auth.currentUser;
        if (currentUser) {
            navigateToHome(event);
        }
        else{
            console.log("Invalid User");
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
    });
  };

  return (
    <div>
      <form onSubmit={handleLoginData} className='form'>
        <h1 className='heading'>Login</h1>
        <input required type="text" placeholder='Enter Email' onChange={onChangeUserEmail} />
        <input required type="password" placeholder='Enter Password' onChange={onChangeUserPassword} />
        <button >Login</button>
        <p>Not Registered? <a href="/">Sign Up</a></p>
        <Toaster/>
    </form>
    </div>
  );
}

export default Login;
