import React, { useState } from 'react'
import "../../styles/signup.css"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from './firebase'
import toast, { Toaster } from 'react-hot-toast';
import { setDoc, doc } from 'firebase/firestore';
export default function Signup() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [fName, setFname] = useState()
    const [lName, setLname] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           await createUserWithEmailAndPassword(auth, email, password)
           const user = auth.currentUser;
           console.log(user)
           if(user){
               await setDoc(doc(db,"User",user.uid),{
                   email: user.email,
                   firstName: fName,
                   lastName: lName
                })
            }
            toast.success('Successfully Registered!!')
           
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div>
    <form onSubmit={handleSubmit} className='form'>
        <h1 className='heading'>Signup</h1>
        <input required type="text" placeholder='Enter FirstName' onChange={(e) => setFname(e.target.value)} />
        <input required type="text" placeholder='Enter LastName' onChange={(e) => setLname(e.target.value)} />
        <input required type="text" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
        <button>Signup</button>
        <p>Already Registered <a href="/">Login</a></p>
        <Toaster/>
    </form>
</div>
  )
}