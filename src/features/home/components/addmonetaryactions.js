import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../login/firebase";
import { getAuth } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserTransactions,
  fetchUserTransactions,
  updateUserTransactions,
  getUserTransactionsLocal,
  fetchUserLastTransactions,
  updateLastTransactions,
} from "../../login/loginSlice";
import firebaseApp from "../../login/firebase";
import { Audio } from "react-loader-spinner";
import toast from "react-hot-toast";
import "../components/componentstyles/addM.css";
import expense from "../../../images/expense.png";
import income from "../../../images/income.png";
import balance from "../../../images/balance.png";
import { pushManuallyaddedTransaction } from "../../login/loginSlice";
function AddmonetaryActions() {
  const stateData = useSelector((state) => state.loginData);
  const dispatch = useDispatch();
  const auth = getAuth(firebaseApp);
  const currentEmail = auth.currentUser && auth.currentUser.email ? auth.currentUser.email : "";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
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
  }, [dispatch]);

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
    setLoading(true);
    try {
      await addDoc(value, userTransaction);

      let currentTransactionValue = parseInt(userTransaction[transactionType], 10) || 0;
      let addedTransactionValue = 0;
      let newTransaction = {};

      if (transactionType === "userExpense") {
        addedTransactionValue = currentTransactionValue + parseInt(stateData.userTransactions.Transactions[transactionType], 10);
        let subtractBalance = parseInt(stateData.userTransactions.Transactions["userBalance"], 10) - currentTransactionValue;
        newTransaction = {
          ...stateData.userTransactions.Transactions,
          [transactionType]: addedTransactionValue.toString(),
          userBalance: subtractBalance.toString(),
        };
      } else if (transactionType === "userIncome") {
        addedTransactionValue = currentTransactionValue + parseInt(stateData.userTransactions.Transactions[transactionType], 10);
        let addIncome = currentTransactionValue + parseInt(stateData.userTransactions.Transactions["userBalance"], 10);
        newTransaction = {
          ...stateData.userTransactions.Transactions,
          [transactionType]: addedTransactionValue.toString(),
          userBalance: addIncome.toString(),
        };
      } else {
        addedTransactionValue = currentTransactionValue + parseInt(stateData.userTransactions.Transactions[transactionType], 10);
        newTransaction = {
          ...stateData.userTransactions.Transactions,
          [transactionType]: addedTransactionValue.toString(),
        };
      }

      setUserTransaction((prevState) => ({
        ...prevState,
        [transactionType]: addedTransactionValue.toString(),
        currentUser: currentEmail,
      }));

      dispatch(getUserTransactionsLocal({ newObject: newTransaction }));
      dispatch(updateUserTransactions(newTransaction));
      toast.success(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} Updated Successfully!`);

      const d = new Date();
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;

      let type = "";
      let image = null;
      if (transactionType === "userIncome") {
        type = "Income";
        image = "https://firebasestorage.googleapis.com/v0/b/financeapp-4593b.appspot.com/o/images%2Fincome.png?alt=media&token=6f3f562b-0857-4366-9063-10aeca355ab3";
      } else if (transactionType === "userExpense") {
        type = "Expense";
        image = "https://firebasestorage.googleapis.com/v0/b/financeapp-4593b.appspot.com/o/images%2Fexpense.png?alt=media&token=c5d9fa75-417e-4a71-b436-5b08da927f3c";
      } else {
        type = "Balance";
        image = "https://firebasestorage.googleapis.com/v0/b/financeapp-4593b.appspot.com/o/images%2Fbalance.png?alt=media&token=ea9ce38e-e48d-44c9-81aa-0b9866c1b329";
      }

      const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(Number(currentTransactionValue));
      let transactions = [];
      let anotherObject = {
        description: type,
        method: "added manually",
        date: formattedDate,
        amount: formattedValue,
        image: image,
      };
      transactions.push(anotherObject)
      // setLastTransactions((prevTransactions) => [anotherObject, ...prevTransactions]);
      dispatch(updateLastTransactions(anotherObject));
      dispatch(pushManuallyaddedTransaction(anotherObject));
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
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Audio height="80" width="80" radius="9" color="green" ariaLabel="loading" />
        </div>
      )}
    </div>
  );
}

export default AddmonetaryActions;
