import React from 'react';
import TagCard from '../components/TagCard';
import API from '../adapters/API';
import NewImage from '../components/NewImage';

const TagBrowser = (props) => {
  
    if (!props.newImage) {
    return (
        <div className="ImageContainer">
        {props.tags.map(tag => 
            <TagCard key={tag.id} tag={tag} images={props.images} handleClick={() => props.handleClick(tag)} scores={API.getScoresFromTag(tag.id)}/>
        )}
        </div>
            )
    } else {
    return (
        <NewImage image={props.image} handleClick={props.handleBackClick} tags={props.newTags} />
    )
    }
}
    

export default TagBrowser