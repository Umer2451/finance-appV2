import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "./components/header";
import Dashboard from "./components/dashboard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LastTransactions from "./components/transactions";
function Home() {
  const data = useSelector((state) => state.loginData);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.isLoggedIn) {
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