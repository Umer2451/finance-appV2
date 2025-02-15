import "../components/componentstyles/lasttransactions.css";
import Segment from "./segment";
import Segmentheader from "./segmentsectionheader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUserLastTransactions } from "../../login/loginSlice";
import { useState, useEffect } from "react";
import { getUserTransactions } from "../../login/loginSlice";
import { db } from "../../login/firebase";
import { getDocs, collection } from "firebase/firestore";
import { updateLastTransactionState } from "../../login/loginSlice";
import { initializeLastTransactions } from "../../login/loginSlice";
function LastTransactions() {
  const data = useSelector(state => state.loginData);
  let lastTransactions = data.lastTransactions;
  let dispatch = useDispatch();
  const value = collection(db, "userTransactions");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let lastData = await dispatch(fetchUserLastTransactions());
        dispatch(updateLastTransactionState(lastData.payload.lastTransactions));
      } catch (error) {
        console.error("Error fetching user last transactions:", error);
      }
    };
    fetchData();
  }, [dispatch]);
  
  let sectionheaderData = [{
    label : "Description",
    label2 : "Method",
    label3 : "Date",
    label4 : "Amount"
  }]
  return (
    <div className="white-background-div">
      <div className="title-div">
      <h1> Last Transactions</h1>
      <p>Check your last transactions</p>
      </div>
      <div className="last-transaction-main-div">
      {sectionheaderData.map((item, index) => (
        <Segmentheader key = {index} title = {item.label} sTitle = {item.label2} tTitle = {item.label3} fTitle = {item.label4}/>
      ))}
       <>
  {/* Conditionally render Segments if lastTransactions has data */}
  {lastTransactions.length > 0 ? (
    lastTransactions.slice().reverse().slice(0, 8).map((item, index) => (
      <Segment
        key={index}
        image={item.image}
        description={item.description}
        amount={item.amount}
        date={item.date}
        method={item.method}
      />
    ))
  ) : (
    <p>No transactions found.</p>
  )}
</>
    </div>
    </div>
  );
}

export default LastTransactions;