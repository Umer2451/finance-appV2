import "../components/componentstyles/header.css";
import Avatar from "../../../images/Avatar.png";
import FinanApp from "../../../images/FinanApp.png";
function Header() {
  return (
    <div className="flex-main">
      <img className ="Logo" src={FinanApp} alt="logo"></img>
      <div className="center-div">
        <ul>
          <li>
            <a href="/home">Overview</a>
          </li>
          <li>
            <a href="/fakestoreproducts">Transactions</a>
          </li>
          <li>
            <a href="/fakestorecart">Analytics</a>
          </li>
          <li>
            <a href="/aboutus">Account</a>
          </li>
          <li>
            <a href="/fakestorelogin">Wallet</a>
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
          <img className="avatar" src={Avatar} alt="avatar-image"></img>
        </ul>
      </div>
    </div>
  );
}
export default Header;
