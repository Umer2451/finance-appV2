import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, addUserData } from './loginSlice';
import firebaseApp from './firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";  // Ensure this path is correct

function Login() {
  const data = useSelector(state => state.loginData);
  const userData = useSelector(state => state.userData);
  const navigate = useNavigate();

  function navigateToHome() {
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

  const handleLoginData = () => {
    dispatch(addUser({username: username, password: password}));
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
        const user = userCredential.user;
        setUserData({userData: userCredential});
        dispatch(addUserData({userData: userCredential}));
        const currentUser = auth.currentUser;
        if (currentUser) {
            navigateToHome();
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
      <div className="form">
      <h1 className="heading" style={{textAlign: "center"}}> Login</h1>
        <input
          onChange={onChangeUserEmail}
          type="text"
          placeholder="Email"
          value={username}
        />
        <input
          onChange={onChangeUserPassword}
          type="password"
          placeholder="Password"
          value={password}
        />
        <button onClick={handleLoginData}>Login</button>
        <p>Not Registered <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
}

export default Login;
