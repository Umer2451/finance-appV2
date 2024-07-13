import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uploadProfilePicURL } from '../../login/loginSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfilePic } from '../../login/loginSlice';
import "../components/componentstyles/profile.css";
import Avatar from "../../../images/Avatar.png"; // Import your default avatar image
function ImageShow() {
    const storage = getStorage();
    const [profilepic, setProfilepic] = useState(""); // State to store selected file
    const [profilepicURL, setProfilepicURL] = useState("");
    // Function to handle file selection
    const navigate = useNavigate();

    function navigateToHome(event) {
        event.preventDefault(); 
        navigate('/home'); 
    }
    let dispatch = useDispatch();
    function handlefileName(event) {
        if (event.target.files[0]) {
            setProfilepic(event.target.files[0]);
            dispatch(setProfilePic(event.target.files[0]))
        }
    }

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        if (profilepic) {
            // Create a storage reference
            const storageRef = ref(storage, 'images/' + profilepic.name);

            // Upload file and metadata to the storage reference
            const uploadTask = uploadBytesResumable(storageRef, profilepic);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Handle upload progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle upload error
                    console.error('Error uploading file:', error);
                },
                () => {
                    // Upload completed successfully, now get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        // Handle saving the download URL to your database or state
                        setProfilepicURL(downloadURL);
                        dispatch(uploadProfilePicURL(downloadURL))
                    });
                }
            );
        }
    }

    return (
        <div className='profileDiv'>
            <img className="avatarProfile" src={profilepic || Avatar} alt="avatar-image" />
            <form className = "flexProfileDiv" onSubmit={handleSubmit}>
                <input type="file" id="myFile" onChange={handlefileName} />
                <input type="submit" value="Upload" />
            </form>
            <button onClick = {navigateToHome}>Back to home</button>
        </div>
    );
}

export default ImageShow;
