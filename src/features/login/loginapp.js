import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import firebaseApp from './firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";
import toast, { Toaster } from 'react-hot-toast';
import { Audio } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { updateLoginState } from './loginSlice';
function LogintoApp() {
  const isLoggedIn = useSelector(state => state.loginData);
  const dispatch = useDispatch();
  const [username, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);  // Set loading to true
    try {
      await signInWithEmailAndPassword(auth, username, password);
      dispatch(updateLoginState({username: username, password: password}))
      debugger;
      const currentUser = auth.currentUser;
      if (currentUser) {
        navigate("/home");
      } else {
        toast.error("Incorrect user or password");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);  // Set loading to false after operation is complete
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className='form'>
        <h1 className='heading'>Login</h1>
        <input
          required
          type="text"
          placeholder='Enter Email'
          value={username}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>Login</button> {/* Disable button when loading */}
        <p>Not Registered? <a href="/signup">Sign Up</a></p>
        <Toaster />
      </form>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        </div>
      )}
    </div>
  );
}

export default LogintoApp;
