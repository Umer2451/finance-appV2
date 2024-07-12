import "../components/componentstyles/doughnutlabels.css";

function DoughnutLabels(props) {
  return (
    <div className="doughnut-labels">
      <div className="iconsDiv" style={{ backgroundColor: props.color }}>
        <span className="material-symbols-outlined">{props.icon}</span>
      </div>
      <div className="textDiv">
        <p className="sort-text">{props.title}</p>
        <div className ="sort-percentage">
        <p>{props.percentage} %</p>
        </div>
      </div>
    </div>
  );
}

export default DoughnutLabels;
