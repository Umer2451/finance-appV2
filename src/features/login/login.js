import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from './loginSlice';
import '../../styles/login.css';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
function Login() {
  const data = useSelector(state => state.loginData);
  const dispatch = useDispatch();
  const [username, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  const onChangeUserEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const onChangeUserPassword = (event) => {
    setUserPassword(event.target.value);
  };

  const handleLoginData = () => {
    dispatch(addUser({username: username, password: password}));
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
        <button onClick={handleLoginData}>Add User</button>
      </div>
    </div>
  );
}

export default Login;
