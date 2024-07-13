import "../components/componentstyles/segment.css";

function Segment(props) {
    return (
        <div className="segment-items">
            <div className="segment-content">
                <img src={props.image} alt="alt_image" width="50" height="50" />
                <p className="description">{props.description}</p>
            </div>
            <p className="method">{props.method}</p>
            <p className="date">{props.date}</p>
            <p className="amount">{props.amount}</p>
        </div>
    );
}

export default Segment;
