import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../components/componentstyles/dashboard.css";
import Monetary from "./monetaryview";
import AddmonetaryActions from "./addmonetaryactions";
function Dashboard() {
  const data = useSelector((state) => state.loginData);
  const navigate = useNavigate();
  function navigateToLogin() {
    navigate("/");
  }
  console.log(data);
  if (true) {
    return <div className="dashboard-body"><h1 className="title">Hello Umer!</h1><div><Monetary /></div><><AddmonetaryActions/></></div>
  } else {
    navigateToLogin();
  }
}
export default Dashboard;
