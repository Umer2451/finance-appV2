import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uploadProfilePicURL } from '../../login/loginSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfilePic } from '../../login/loginSlice';
import { Audio } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast'; // Import the toast components
import "../components/componentstyles/profile.css";
import Avatar from "../../../images/Avatar.png"; // Import your default avatar image

function ImageShow() {
    const storage = getStorage();
    const [profilepic, setProfilepic] = useState(""); // State to store selected file
    const [profilepicURL, setProfilepicURL] = useState("");
    const [loading, setLoading] = useState(false); // State to manage loading
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function navigateToHome(event) {
        event.preventDefault(); 
        navigate('/home'); 
    }

    function handlefileName(event) {
        if (event.target.files[0]) {
            setProfilepic(event.target.files[0]);
            dispatch(setProfilePic(event.target.files[0]));
        }
    }

    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        if (!profilepic) {
            toast.error("Please select a file to upload."); // Show toast error
            return;
        }

        setLoading(true); // Set loading to true when upload starts

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
            },
            (error) => {
                // Handle upload error
                console.error('Error uploading file:', error);
                setLoading(false); // Set loading to false on error
                toast.error('Error uploading file. Please try again.');
            },
            () => {
                // Upload completed successfully, now get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // Handle saving the download URL to your database or state
                    setProfilepicURL(downloadURL);
                    dispatch(uploadProfilePicURL(downloadURL));
                    setLoading(false); // Set loading to false when upload completes
                    toast.success('File uploaded successfully!');
                });
            }
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img className="avatar-profile" src={profilepicURL || Avatar} alt="avatar" />
                <h2>User Profile</h2>
            </div>
            <form className="profile-form" onSubmit={handleSubmit}>
                <input 
                    className="home-button" 
                    type="file" 
                    id="myFile" 
                    onChange={handlefileName} 
                    disabled={loading} // Disable file input when loading
                />
                <input 
                    type="submit" 
                    value="Upload" 
                    disabled={loading} // Disable submit button when loading
                />
            </form>
            <button 
                className="home-button" 
                onClick={navigateToHome} 
                disabled={loading} // Disable home button when loading
            >
                Back to Home
            </button>
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
            <Toaster /> {/* Add the Toaster component */}
        </div>
    );
}

export default ImageShow;
