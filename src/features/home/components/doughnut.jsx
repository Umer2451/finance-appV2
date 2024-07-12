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
      value: 25,
    },
    {
      label: "Credit Card",
      value: 25,
    },
    {
      label: "Shopping",
      value: 25,
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
    },
    {
      label: "Transportation",
      icon: "local_shipping",
    },
    {
      label: "Credit Card",
      icon: "credit_card",
    },
    {
      label: "Shopping",
      icon: "shopping_cart",
    },
    {
      label: "Groceries",
      icon: "shopping_basket",
    },
  ];
  return (
    <div className="main-doughnut-div">
      <DonutChart selectedOffset={false} data={data} />{" "}
      <div className="doughnut-labels">
        {labels.map((item, index) => (
          <DoughnutLabels key={index} icon={item.icon} title={item.label} />
        ))}
      </div>
    </div>
  );
}
export default MYdounutChart;
