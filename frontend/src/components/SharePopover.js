import React, {useRef} from "react";

export default function SharePopover(props) {
    const {show, onClose} = props;
    const inputRef = useRef(null);
    const classNames = show ? "popover fade show bs-popover-left" : "popover fade bs-popover-left";
    function Copy(e){
        inputRef.current.select();
        document.execCommand('copy');
    }
    return(show ?
        <div className={classNames} role="tooltip" x-placement="left">
                <h3 className="popover-header">Share!</h3>
                <div className="popover-body">
                    <input ref={inputRef} type="text" className="form-control" value={window.location.href}/>
                </div>
                <div>
                    <button className="btn btn-outline-primary btn-sm m-2 popover-button" onClick={Copy}>Copy Link</button>
                    <button className="btn btn-outline-secondary btn-sm m-2 popover-button" onClick={onClose}>Close</button>
                </div>
            </div> : null
    )
}