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
  if (true) {
    return <div><h1 className="title">Hello Umer!</h1>;</div>
  } else {
    navigateToLogin();
  }
}
export default Dashboard;
