import "../components/componentstyles/doughnutlabels.css"
function DoughnutLabels(props){
    return(<div className="doughnut-labels">
    <p><span className="material-symbols-outlined">{props.icon}</span>{props.title}</p>
    </div>)
}
export default DoughnutLabels;