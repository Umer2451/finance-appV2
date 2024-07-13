import "../components/componentstyles/sectionheader.css";

function Segmentheader(props) {
    return (
        <div className="section-header-row">
            <p>{props.title}</p>
            <p>{props.sTitle}</p>
            <p>{props.tTitle}</p>
            <p>{props.fTitle}</p>
        </div>
    );
}

export default Segmentheader;
