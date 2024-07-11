import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../components/componentstyles/dashboard.css"
function Dashboard() {
  const data = useSelector((state) => state.loginData);
  const navigate = useNavigate();
  function navigateToLogin() {
    navigate("/");
  }
  console.log(data);
  if (data.isLoggedIn) {
    return <h1 className="title">Hello {data.loginData[0].username}!</h1>;
  } else {
    navigateToLogin();
  }
}
export default Dashboard;
