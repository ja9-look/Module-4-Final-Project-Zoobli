import React from 'react';
import TagCard from '../components/TagCard';
import API from '../adapters/API';

const TagBrowser = (props) => {
    return (
        <div className="ImageContainer">
        {props.tags.map(tag => 
            <TagCard key={tag.id} tag={tag} images={props.images} handleClick={() => props.handleClick(tag)} scores={API.getScoresFromTag(tag.id)} />
        )}
        </div>
            )
}
    

export default TagBrowser