import React from 'react';
import $ from 'jquery';

// $(function () {
//   $('[data-toggle="example-popover"]').popover()
// })
git

export default function ConfirmDelete(props){
    const {onDelete} = props;
    return (
        <>
            <div onClick={onDelete} data-toggle="example-popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Wonderful Delete component</div>
        </>
    )
}