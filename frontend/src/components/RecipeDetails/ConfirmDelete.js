import React from 'react';


export default function ConfirmDelete(props) {
    const {onAgree, show, onDisagree, itemType} = props;
    console.log("SHOW value from component", show);
    const classNames = show ? "popover fade show bs-popover-left" : "popover fade bs-popover-left";
    return (show ?
        <>
            <div className={classNames} role="tooltip" x-placement="left">
                <h3 className="popover-header">Alarm!</h3>
                <div className="popover-body">
                    Are you sure you want to delete this {itemType}?
                </div>
                <div>
                    <button className="btn btn-outline-primary btn-sm m-2 popover-button" onClick={onAgree}>Ok</button>
                    <button className="btn btn-outline-secondary btn-sm m-2 popover-button" onClick={onDisagree}>Cancel</button>
                </div>
            </div>
        </> : null
    )
}