import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Home() {
  const data = useSelector((state) => state.loginData);
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
        <Header />
      </div>
      <div>
        <Dashboard />
      </div>
      <Toaster />
    </div>
  );
}

export default Home;