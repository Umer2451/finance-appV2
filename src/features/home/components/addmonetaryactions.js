import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../login/firebase";
import { getAuth } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { getUserTransactions, fetchUserTransactions, updateUserTransactions, getUserTransactionsLocal } from "../../login/loginSlice";
import firebaseApp from "../../login/firebase";
import { Audio } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import "../components/componentstyles/addM.css"; // Assuming your CSS file path is correct
import lastTransactions from "../../mockAPI/lastTransactions";
import expense from "../../../images/expense.png"; // Import your default avatar image
import income from "../../../images/income.png"; // Import your default avatar image
import balance from "../../../images/balance.png"; // Import your default avatar image

function AddmonetaryActions() {
  const stateData = useSelector((state) => state.loginData);
  const dispatch = useDispatch();
  const auth = getAuth(firebaseApp);
  const currentEmail = auth.currentUser && auth.currentUser.email ? auth.currentUser.email : "";

  // Initialize userTransaction state with default values
  const [userTransaction, setUserTransaction] = useState({
    userIncome: "",
    userExpense: "",
    userBalance: "",
  });

  const [inputVisibility, setInputVisibility] = useState({
    income: false,
    expense: false,
    balance: false,
  });

  const value = collection(db, "userTransactions");
  const [loading, setLoading] = useState(false);  // Add loading state

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      // Assuming setVal is used somewhere else
      // setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();

    const getDataDB = async () => {
      try {
        let data = await dispatch(fetchUserTransactions());
        if (data.payload) {
          dispatch(getUserTransactions({ userTransaction: data.payload }));
          setUserTransaction(data.payload);
        } else {
          console.log("No Data to be found");
        }
      } catch (error) {
        console.error("Error fetching user transactions:", error);
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

  const createTransaction = async (transactionType) => {
    setLoading(true);  // Set loading to true
    try {
      debugger;
      await addDoc(value, userTransaction);

      let currentTransactionValue = parseInt(userTransaction[transactionType], 10) || 0;
      let addedTransactionValue = 0;
      let newTransaction = {};
      if(transactionType === "userExpense"){
        addedTransactionValue = currentTransactionValue + parseInt(stateData.userTransactions.Transactions[transactionType], 10);
        let subtractBalance =  parseInt(stateData.userTransactions.Transactions["userBalance"], 10) - currentTransactionValue;
        newTransaction = {
          ...stateData.userTransactions.Transactions,
          [transactionType]: addedTransactionValue.toString(),
          "userBalance": subtractBalance.toString(),
        };
      }
      else if(transactionType === "userIncome"){
        addedTransactionValue = currentTransactionValue + parseInt(stateData.userTransactions.Transactions[transactionType], 10);
        let addIncome = currentTransactionValue + parseInt(stateData.userTransactions.Transactions["userBalance"], 10);
        newTransaction = {
          ...stateData.userTransactions.Transactions,
          [transactionType]: addedTransactionValue.toString(),
          "userBalance": addIncome.toString(),
        };
      }
      else{
        addedTransactionValue = currentTransactionValue + parseInt(stateData.userTransactions.Transactions[transactionType], 10);
        newTransaction = {
          ...stateData.userTransactions.Transactions,
          [transactionType]: addedTransactionValue.toString(),
        };
      }

      // Update userTransaction state correctly
      setUserTransaction(prevState => ({
        ...prevState,
        [transactionType]: addedTransactionValue.toString(),
        currentUser: currentEmail
      }));

      dispatch(getUserTransactionsLocal({ newObject: newTransaction }));
      dispatch(updateUserTransactions(newTransaction));
      toast.success(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} Updated Successfully!`);
      const d = new Date();

      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
      const year = d.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;
      let type = "";
      let image = null;
      if(transactionType === "userIncome"){
        type = "Income";
        image = income;
      }
      else if(transactionType === "userExpense"){
        type = "Expense";
        image = expense;
      }
      else{
        type = "Balance";
        image = balance;
      }
      let anotherObject = {
        "description": type,
        "method": "added manually",
        "date": formattedDate,
        "amount": currentTransactionValue.toString(),
        "image": image
      }
      lastTransactions.unshift(anotherObject);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addmonetary-container">
      <div className={`addmonetary-section ${inputVisibility.income ? "active" : ""}`}>
        <div className="addmonetary-section-left">
          <button className="add-income-button" onClick={() => toggleVisibility("income")}>
            <span className="material-symbols-outlined">loupe</span>
          </button>
          <div className={`incomeDiv paragraphDiv ${inputVisibility.income ? "hidden" : ""}`}>
            <h2 style={{ display: "flex", height: "1px" }}>Add Income</h2>
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
            onClick={() => createTransaction("userIncome")}
            style={{ display: inputVisibility.income ? "block" : "none" }}
          >
            Submit Income
          </button>
        </div>
      </div>
      <div className={`addmonetary-section ${inputVisibility.expense ? "active" : ""}`}>
        <div className="addmonetary-section-left">
          <button className="add-expense-button" onClick={() => toggleVisibility("expense")}>
            <span className="material-symbols-outlined">currency_exchange</span>
          </button>
          <div className={`expenseDiv paragraphDiv ${inputVisibility.expense ? "hidden" : ""}`}>
            <h2 style={{ display: "flex", height: "1px" }}>Add Expense</h2>
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
            onClick={() => createTransaction("userExpense")}
            style={{ display: inputVisibility.expense ? "block" : "none" }}
          >
            Submit Expense
          </button>
        </div>
      </div>
      <div className={`addmonetary-section ${inputVisibility.balance ? "active" : ""}`}>
        <div className="addmonetary-section-left">
          <button className="add-balance-button" onClick={() => toggleVisibility("balance")}>
            <span className="material-symbols-outlined">account_balance</span>
          </button>
          <div className={`balanceDiv paragraphDiv ${inputVisibility.balance ? "hidden" : ""}`}>
            <h2 style={{ display: "flex", height: "1px" }}>Add Balance</h2>
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
            onClick={() => createTransaction("userBalance")}
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
