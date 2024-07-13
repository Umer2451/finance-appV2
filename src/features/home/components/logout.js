import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import "../components/componentstyles/logout.css"
const Logout = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        signOut(auth)
            .then(() => {
                console.log('User signed out');
                navigate('/finance-app'); // Redirect to login page after successful logout
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    }, [auth, navigate]);

    return (
        <div className="logout-container">
            <p>Logging out...</p>
        </div>
    );
};

export default Logout;
