import React, {useState} from 'react'
import AddIngredient from "../AddIngredient";

export default function TagsList(props) {
    const {tags} = props;
    const tagUrl = (tag) => `http://127.0.0.1/tag/${tag.id}/`

    const renderTag = (tag) => {
        return <><span className="label label-primary"><a href={tagUrl(tag)}>{tag.name}</a></span></>
    }

    return (<>
            <div className="card-text">
                {tags.map(renderTag)}
            </div>
        </>
    )
}