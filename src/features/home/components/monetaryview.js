import "../components/componentstyles/mstyle.css";
import { useSelector } from "react-redux";

function Monetary() {
  const data = useSelector((state) => state.loginData.userTransactions?.Transactions);

  // Ensure data exists and has the required keys
  const userTransaction = data?.userTransaction ?? {};
  const userBalance = userTransaction.userBalance ?? "0";
  const userExpense = userTransaction.userExpense ?? "0";
  const userIncome = userTransaction.userIncome ?? "0";

  return (
    <div className="monetary-container">
      <div className="balance-container">
        <div className="balance-text">Balance</div>
        <div className="balance-amount">$ {userBalance}</div>
        <div className="arrow-container">
          <span className="material-symbols-outlined">arrow_upward</span>
          <p>12.5%</p>
        </div>
      </div>

      <div className="balance-container">
        <div className="balance-text">Expense</div>
        <div className="balance-amount">$ {userExpense}</div>
        <div className="arrow-container">
          <span className="material-symbols-outlined">arrow_downward</span>
          <p>8.2%</p>
        </div>
      </div>

      <div className="balance-container">
        <div className="balance-text">Income</div>
        <div className="balance-amount">$ {userIncome}</div>
        <div className="arrow-container">
          <span className="material-symbols-outlined">arrow_upward</span>
          <p>20.1%</p>
        </div>
      </div>
    </div>
  );
}

export default Monetary;
