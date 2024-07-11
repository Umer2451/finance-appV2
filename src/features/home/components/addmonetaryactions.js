import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../login/firebase";
import { getAuth } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { getUserTransactions } from "../../login/loginSlice";
import firebaseApp from "../../login/firebase";
import "../components/componentstyles/addM.css"; // Assuming your CSS file path is correct

function AddmonetaryActions() {
  const stateData = useSelector((state) => state.userTransactions);
  const dispatch = useDispatch();
  const auth = getAuth(firebaseApp);
  const currentEmail =
    auth.currentUser && auth.currentUser.email ? auth.currentUser.email : "";

  const [userTransaction, setUserTransaction] = useState({
    userBalance: "0",
    userExpense: "0",
    userIncome: "0",
    currentUser: currentEmail,
  });

  const [inputVisibility, setInputVisibility] = useState({
    income: false,
    expense: false,
    balance: false,
  });

  const [val, setVal] = useState([]);
  const value = collection(db, "userTransactions");

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
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
    await addDoc(value, userTransaction);
    setUserTransaction({
      userBalance: "0",
      userExpense: "0",
      userIncome: "0",
    });
    dispatch(getUserTransactions({ userTransaction }));
  };

  return (
    <div className="addmonetary-container">
      <div
        className={`addmonetary-section ${
          inputVisibility.income ? "active" : ""
        }`}
      >
        <div className="addmonetary-section-left">
          <button onClick={() => toggleVisibility("income")}>
            <span class="material-symbols-outlined">loupe</span>
          </button>
          <div
            className={`incomeDiv paragraphDiv ${
              inputVisibility.income ? "hidden" : ""
            }`}
          >
            <p>Add Income</p>
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
          <button onClick={() => toggleVisibility("expense")}>
            <span class="material-symbols-outlined">currency_exchange</span>
          </button>
          <div
            className={`expenseDiv paragraphDiv ${
              inputVisibility.expense ? "hidden" : ""
            }`}
          >
            <p>Add Expense</p>
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
          <button onClick={() => toggleVisibility("balance")}>
            <span class="material-symbols-outlined">account_balance</span>
          </button>
          <div
            className={`balanceDiv paragraphDiv ${
              inputVisibility.balance ? "hidden" : ""
            }`}
          >
            <p>Add Balance</p>
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
            onClick={createTransaction}
            style={{ display: inputVisibility.balance ? "block" : "none" }}
          >
            Submit Balance
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddmonetaryActions;
