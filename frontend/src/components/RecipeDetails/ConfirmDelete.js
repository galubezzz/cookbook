import React, {useState} from 'react';


export default function ConfirmDelete(props) {
    const {onAgree, show, onDisagree} = props;
    const classNames = show ? "popover fade show bs-popover-left" : "popover fade bs-popover-left";
    const styles = {
        top: "6px",
        left: "-272px"
    };
    return (
        <>
            <div className={classNames} role="tooltip" x-placement="left" style={styles}>
                <div className="arrow"></div>
                <h3 className="popover-header">Alarm!</h3>
                <div className="popover-body">
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus.
                </div>
                <div>
                    <button className="btn btn-outline-primary btn-sm m-2 popover-button" onClick={onAgree}>Ok</button>
                    <button className="btn btn-outline-secondary btn-sm m-2 popover-button" onClick={onDisagree}>Cancel</button>
                </div>
            </div>
        </>
    )
}