import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LastTransactions from "./components/transactions";
function Home() {
  const data = useSelector((state) => state.loginData);
  const profilepic = data.setProfilepicURL;// Fetch profile pic from Redux state
  const navigate = useNavigate();
  useEffect(() => {
    if (true) {
      toast.success("Successfully Logged In!!");
    } else {
      navigate("/");
    }
  }, [data.isLoggedIn, navigate]);

  return (
    <div>
      <div>
        <Header profilepic = {profilepic}/>
      </div>
      <div>
        <Dashboard />
      </div>
      <Toaster />
    </div>
  );
}

export default Home;