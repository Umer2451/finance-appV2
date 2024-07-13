import React, { useState } from 'react';
import "../components/componentstyles/header.css";
import Avatar from "../../../images/Avatar.png"; // Import your default avatar image
import FinanApp from "../../../images/FinanApp.png"; // Import your application logo
import { useSelector } from 'react-redux';

function Header(props) {
  const [showMenu, setShowMenu] = useState(false);
  let profilepic = props.profilepic || Avatar;
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex-main">
      <img className="Logo" src={FinanApp} alt="logo" />
      <div className="center-div">
        <ul>
          <li>
            <a href="/home">Overview</a>
          </li>
          <li>
            <a href="/transactions">Transactions</a>
          </li>
          <li>
            <a href="/analytics">Analytics</a>
          </li>
          <li>
            <a href="/account">Account</a>
          </li>
          <li>
            <a href="/wallet">Wallet</a>
          </li>
          <li>
            <a href="/fakestorelogin">
              <span className="material-symbols-outlined">settings</span>
            </a>
          </li>
          <li>
            <a href="/fakestorelogin">
              <span className="material-symbols-outlined">notifications</span>
            </a>
          </li>
          <li className="avatar-container" onClick={toggleMenu}>
            <img className="avatar" src={profilepic || Avatar} alt="avatar-image" /> {/* Display profile pic or default Avatar */}
            {showMenu && (
              <div className="avatar-menu">
                <div className="menu-item">
                  <img className="avatar" src={profilepic || Avatar} alt="avatar-image" /> {/* Display profile pic or default Avatar */}
                </div>
                <ul>
                  <li>
                    <a href="/profile">Profile</a>
                  </li>
                  <li>
                    <a href="/settings">Settings</a>
                  </li>
                  <li>
                    <a href="/logout">Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
