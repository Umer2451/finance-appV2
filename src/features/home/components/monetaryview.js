import "../components/componentstyles/mstyle.css";

function Monetary() {
  return (
    <div className="balance-container">
      <div className="balance-text">Balance</div>
      <div className="balance-amount">$1,234.56</div>
      <div className="arrow-container">
        <span className="material-symbols-outlined">arrow_upward</span>
        <p>12.5%</p>
      </div>
    </div>
  );
}

export default Monetary;
