import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../login/firebase";
import { getAuth } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { getUserTransactions } from "../../login/loginSlice";
import { fetchUserTransactions } from "../../login/loginSlice";
import firebaseApp from "../../login/firebase";
import "../components/componentstyles/addM.css"; // Assuming your CSS file path is correct
import { updateUserTransactions } from "../../login/loginSlice";
import { getDoc, doc} from "firebase/firestore";
import {  query, where } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import { Audio } from 'react-loader-spinner';
function AddmonetaryActions() {
  const stateData = useSelector((state) => state.userTransactions);
  const dispatch = useDispatch();
  const auth = getAuth(firebaseApp);
  const currentEmail =
    auth.currentUser && auth.currentUser.email ? auth.currentUser.email : "";
  const [userTransaction, setUserTransaction] = useState("");

  const [inputVisibility, setInputVisibility] = useState({
    income: false,
    expense: false,
    balance: false,
  });

  const [val, setVal] = useState([]);
  const [data2, getDataforTransactions] = useState("");
  const value = collection(db, "userTransactions");
  const [loading, setLoading] = useState(false);  // Add loading state
  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
    const getDataDB = async () => {
        let data = await dispatch(fetchUserTransactions())
        if(data.payload){
            dispatch(getUserTransactions({ userTransaction : data.payload }));
            setUserTransaction(data.payload);
        }
        else{
            console.log("No Data to be found");
        }
      };
    getDataDB();
  }, []); // Empty dependency array ensures this runs only once

  const toggleVisibility = (field) => {
    setInputVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createTransaction = async () => {
    setLoading(true);  // Set loading to true
    try {
        await addDoc(value, userTransaction);
        setUserTransaction({
          userBalance: userTransaction.userBalance ? userTransaction.userBalance : "0",
          userExpense: userTransaction.userExpense ? userTransaction.userExpense : "0",
          userIncome: userTransaction.userIncome ? userTransaction.userIncome : "0",
          currentUser: currentEmail
        });
        dispatch(getUserTransactions({ userTransaction }));
        dispatch(updateUserTransactions(userTransaction));
        toast.success("Data Updated Successfully!");
    }
    catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);  // Set loading to false after operation is complete
      }
  };

  return (
    <div className="addmonetary-container">
      <div
        className={`addmonetary-section ${
          inputVisibility.income ? "active" : ""
        }`}
      >
        <div className="addmonetary-section-left">
          <button className = "add-income-button" onClick={() => toggleVisibility("income")}>
            <span className="material-symbols-outlined">loupe</span>
          </button>
          <div
            className={`incomeDiv paragraphDiv ${
              inputVisibility.income ? "hidden" : ""
            }`}
          >
            <h2 style={{display: "flex", height: "1px"}}>Add Income</h2>
            <p>Create an income manually</p>
          </div>
        </div>
        <div className="addmonetary-section-right">
          <input
            name="userIncome"
            value={userTransaction.userIncome}
            onChange={handleInputChange}
            style={{ display: inputVisibility.income ? "block" : "none" }}
          />
          <button
            className="add-submit-button"
            onClick={createTransaction}
            style={{ display: inputVisibility.income ? "block" : "none" }}
          >
            Submit Income
          </button>
        </div>
      </div>
      <div
        className={`addmonetary-section ${
          inputVisibility.expense ? "active" : ""
        }`}
      >
        <div className="addmonetary-section-left">
          <button className = "add-expense-button" onClick={() => toggleVisibility("expense")}>
            <span className="material-symbols-outlined">currency_exchange</span>
          </button>
          <div
            className={`expenseDiv paragraphDiv ${
              inputVisibility.expense ? "hidden" : ""
            }`}
          >
            <h2 style={{display: "flex", height: "1px"}}>Add Expense</h2>
            <p>Create an expense manually</p>
          </div>
        </div>
        <div className="addmonetary-section-right">
          <input
            name="userExpense"
            value={userTransaction.userExpense}
            onChange={handleInputChange}
            style={{ display: inputVisibility.expense ? "block" : "none" }}
          />
          <button
          className="add-submit-button"
            onClick={createTransaction}
            style={{ display: inputVisibility.expense ? "block" : "none" }}
          >
            Submit Expense
          </button>
        </div>
      </div>
      <div
        className={`addmonetary-section ${
          inputVisibility.balance ? "active" : ""
        }`}
      >
        <div className="addmonetary-section-left">
          <button className = "add-balance-button" onClick={() => toggleVisibility("balance")}>
            <span className="material-symbols-outlined">account_balance</span>
          </button>
          <div
            className={`balanceDiv paragraphDiv ${
              inputVisibility.balance ? "hidden" : ""
            }`}
          >
            <h2 style={{display: "flex", height: "1px"}}>Add Balance</h2>
            <p>Create a balance manually</p>
          </div>
        </div>
        <div className="addmonetary-section-right">
          <input
            name="userBalance"
            value={userTransaction.userBalance}
            onChange={handleInputChange}
            style={{ display: inputVisibility.balance ? "block" : "none" }}
          />
          <button
            className="add-submit-button"
            onClick={createTransaction}
            style={{ display: inputVisibility.balance ? "block" : "none" }}
          >
            Submit Balance
          </button>
        </div>
      </div>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        </div>
      )}
    </div>
  );
}

export default AddmonetaryActions;
