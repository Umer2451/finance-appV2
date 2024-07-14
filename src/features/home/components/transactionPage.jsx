import Segmentheader from "./segmentsectionheader";
import Segment from "./segment";
import Header from "./header";
import { useSelector } from "react-redux";
function TransactionPage(){
    const data = useSelector(state => state.loginData);
    let lastTransactions = data.lastTransactions;
    let sectionheaderData = [{
        label : "Description",
        label2 : "Method",
        label3 : "Date",
        label4 : "Amount"
      }]
    return(<div>
        <div>
        <Header></Header>
        <h1> All Transactions</h1>
        <p> All User's Transactions can be found here!</p>
        <div>
        {sectionheaderData.map((item, index) => (
        <Segmentheader key = {index} title = {item.label} sTitle = {item.label2} tTitle = {item.label3} fTitle = {item.label4}/>
      ))}            
       <>
  {/* Conditionally render Segments if lastTransactions has data */}
  {lastTransactions.length > 0 ? (
    lastTransactions.map((item, index) => (
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
        </div>
    </div>)
}
export default TransactionPage;