import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../components/componentstyles/dashboard.css";
import Monetary from "./monetaryview";
import AddmonetaryActions from "./addmonetaryactions";
import MYdounutChart from "./doughnut";
function Dashboard() {
  const navigate = useNavigate();
  function navigateToLogin() {
    navigate("/");
  }
  if (true) {
    return <div className="dashboard-body"><h1 className="title">Hello Umer!</h1><div><Monetary /></div><><AddmonetaryActions/><MYdounutChart></MYdounutChart></></div>
  } else {
    navigateToLogin();
  }
}
export default Dashboard;
