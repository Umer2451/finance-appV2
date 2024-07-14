import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLastTransactionState, fetchUserLastTransactions } from "../../login/loginSlice";
import Segmentheader from "./segmentsectionheader";
import Segment from "./segment";
import Header from "./header";
import "../components/componentstyles/transactionPage.css"; // Import the CSS file

function TransactionPage() {
  const data = useSelector(state => state.loginData);
  let lastTransactions = data.lastTransactions || []; // Ensure it's an array
  let dispatch = useDispatch();
  let sectionheaderData = [{
    label: "Description",
    label2: "Method",
    label3: "Date",
    label4: "Amount"
  }];

  const [loading, setLoading] = useState(false);
  const [sortedTransactions, setSortedTransactions] = useState(lastTransactions);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5); // Adjust as needed

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let lastData = await dispatch(fetchUserLastTransactions());
        dispatch(updateLastTransactionState(lastData.payload.lastTransactions));
        setSortedTransactions(lastData.payload.lastTransactions || []);
      } catch (error) {
        console.error("Error fetching user last transactions:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleSort = (timePeriod) => {
    setLoading(true);
    let sortedData = [];
    const now = new Date();
    if (timePeriod === "thisMonth") {
      sortedData = lastTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear();
      });
    } else if (timePeriod === "lastMonth") {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      sortedData = lastTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === lastMonth.getMonth() && transactionDate.getFullYear() === lastMonth.getFullYear();
      });
    } else if (timePeriod === "thisYear") {
      sortedData = lastTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getFullYear() === now.getFullYear();
      });
    } else if (timePeriod === "last12Months") {
      const lastYear = new Date(now.getFullYear() - 1, now.getMonth(), 1);
      sortedData = lastTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= lastYear && transactionDate <= now;
      });
    }
    setSortedTransactions(sortedData);
    setLoading(false);
    setCurrentPage(1); // Reset to the first page
  };

  // Get current transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="transaction-page">
      <Header />
      <div className="transaction-header">
        <h1>All Transactions</h1>
        <p>All User's Transactions can be found here!</p>
      </div>
      <div className="button-container">
        <button onClick={() => handleSort("thisMonth")}>This Month</button>
        <button onClick={() => handleSort("lastMonth")}>Last Month</button>
        <button onClick={() => handleSort("thisYear")}>This Year</button>
        <button onClick={() => handleSort("last12Months")}>Last 12 Months</button>
      </div>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <div>
            {sectionheaderData.map((item, index) => (
              <Segmentheader key={index} title={item.label} sTitle={item.label2} tTitle={item.label3} fTitle={item.label4} />
            ))}
            <>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((item, index) => (
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
          <div className="pagination">
            {[...Array(Math.ceil(sortedTransactions.length / transactionsPerPage)).keys()].map(number => (
              <button key={number} onClick={() => paginate(number + 1)}>{number + 1}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TransactionPage;
