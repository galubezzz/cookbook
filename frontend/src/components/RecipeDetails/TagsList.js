import React, {useState} from 'react'

export default function TagsList(props) {
    const {tags} = props;
    const tagUrl = (tag) => `/tag/${tag.name}`;

    const renderTag = (tag) => {
        return <><span className="badge badge-light card-link"><a href={tagUrl(tag)}>{tag.name}</a></span></>
    }

    return (<>
            <div className="mt-2">
                {tags.map(renderTag)}
            </div>
        </>
    )
}