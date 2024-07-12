import DonutChart from "react-donut-chart";
import "../components/componentstyles/doughnut.css";
import DoughnutLabels from "./doughnutlabels";
function MYdounutChart(props) {
  let data = [
    {
      label: "Home",
      value: 25,
    },
    {
      label: "Transportation",
      value: 35,
    },
    {
      label: "Credit Card",
      value: 25,
    },
    {
      label: "Shopping",
      value: 5,
    },
    {
      label: "Groceries",
      value: 25,
    },
  ];
  let labels = [
    {
      label: "Home",
      icon: "home",
      value: 25,
      color: "#F04438"
    },
    {
      label: "Transportation",
      icon: "local_shipping",
      value: 35,
      color: "#36A2EB"
    },
    {
      label: "Credit Card",
      icon: "credit_card",
      value: 25,
      color: "#FFCE56"
    },
    {
      label: "Shopping",
      icon: "shopping_cart",
      value: 5,
      color: "#4BC0C0"
    },
    {
      label: "Groceries",
      icon: "shopping_basket",
      value: 25,
      color: "#9966FF"
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
