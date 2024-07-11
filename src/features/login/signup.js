import React, { useState } from 'react';
import "../../styles/signup.css";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import toast, { Toaster } from 'react-hot-toast';
import { setDoc, doc } from 'firebase/firestore';
import { Audio } from 'react-loader-spinner';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "User", user.uid), {
          email: user.email,
          firstName: fName,
          lastName: lName
        });
      }
      toast.success('Successfully Registered!!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading to false after operation is complete
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        <h1 className='heading'>Signup</h1>
        <input required type="text" placeholder='Enter FirstName' onChange={(e) => setFname(e.target.value)} />
        <input required type="text" placeholder='Enter LastName' onChange={(e) => setLname(e.target.value)} />
        <input required type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={loading}>Signup</button> {/* Disable button when loading */}
        <p>Already Registered <a href="/">Login</a></p>
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