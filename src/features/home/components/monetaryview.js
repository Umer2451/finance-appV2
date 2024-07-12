import "../components/componentstyles/mstyle.css";
import { useSelector } from "react-redux";

function Monetary() {
  const data = useSelector((state) => state.loginData.userTransactions?.Transactions);

  // Ensure data exists and has the required keys
  const userBalance = Number(data.userBalance ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const userExpense = Number(data.userExpense ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const userIncome = Number(data.userIncome ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className="monetary-container">
      <div className="balance-container">
        <div className="balance-text">Balance</div>
        <div className="balance-amount">{userBalance}</div>
        <div className="arrow-container">
          <span className="material-symbols-outlined">arrow_upward</span>
          <p>12.5%</p>
        </div>
      </div>

      <div className="balance-container">
        <div className="balance-text">Income</div>
        <div className="income-amount">{userIncome}</div>
        <div className="arrow-container">
          <span className="material-symbols-outlined">arrow_upward</span>
          <p>20.1%</p>
        </div>
      </div>

      <div className="balance-container">
        <div className="balance-text">Expense</div>
        <div className="expenses-amount">{userExpense}</div>
        <div className="arrow-container">
          <span className="material-symbols-outlined">arrow_downward</span>
          <p>8.2%</p>
        </div>
      </div>

    </div>
  );
}

export default Monetary;
