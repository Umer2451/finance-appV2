import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, addUserData } from './loginSlice';
import '../../styles/login.css';
import firebaseApp from './firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const data = useSelector(state => state.loginData);
  const userData = useSelector(state => state.userData);
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
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
    });
  };
  return (
    <div>
        <h1 style={{textAlign: "center"}}> Login</h1>
      <div>
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
      </div>
    </div>
  );
}

export default Login;
