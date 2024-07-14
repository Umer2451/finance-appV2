import DonutChart from "react-donut-chart";
import "../components/componentstyles/doughnut.css";
import DoughnutLabels from "./doughnutlabels";
import { useSelector } from "react-redux";
function MYdounutChart(props) {
  debugger;
  const loginData = useSelector(state => state.loginData);
  let userTransactions = loginData.userTransactions.Transactions;
  let data = [
    {
      label: "Balance",
      value: parseInt(userTransactions.userBalance),
    },
    {
      label: "Income",
      value: parseInt(userTransactions.userIncome),
    },
    {
      label: "Expense",
      value: parseInt(userTransactions.userExpense),
    }
  ];
  let income = parseInt(userTransactions.userIncome);
  let balance = parseInt(userTransactions.userBalance)
  let expense =  parseInt(userTransactions.userExpense);
  let total = income + expense + balance;

  let incomePercentage = ((income / total) * 100).toFixed(1);
  let expensePercentage = ((expense / total) * 100).toFixed(1);
  let balancePercentage = ((balance / total) * 100).toFixed(1);
  
  let labels = [
    {
      label: "Balance",
      icon: "home",
      value: balancePercentage,
      color: "#F04438"
    },
    {
      label: "Income",
      icon: "local_shipping",
      value: incomePercentage,
      color: "#36A2EB"
    },
    {
      label: "Expense",
      icon: "credit_card",
      value: expensePercentage,
      color: "#FFCE56"
    },
  ];
  let colors= ["#F04438", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]; 
  return (
    <div className="main-doughnut-div">
      <DonutChart selectedOffset={false} colors={colors} data={data}  />{" "}
      <div className="doughnut-labels">
        {labels.map((item, index) => (
          <DoughnutLabels key={index} icon={item.icon} title={item.label} percentage = {item.value} color = {item.color} />
        ))}
      </div>
    </div>
  );
}
export default MYdounutChart;
