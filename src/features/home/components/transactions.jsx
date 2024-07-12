import "../components/componentstyles/lasttransactions.css";
import Segment from "./segment";
import Segmentheader from "./segmentsectionheader";
function LastTransactions() {
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
      <Segment />
      </>
    </div>
    </div>
  );
}

export default LastTransactions;
