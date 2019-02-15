import React from 'react';
import ListComponent from './ListComponent'

const NewImage = props => {

    return (
        <div className='image_text_wrapper'>
            <button className='BackButton' onClick={props.handleClick}>Back</button>
            <div className='left'>
            <img className='newImage' src={props.image.image_url} alt=''/>
            </div>
            <div className='right'>
            <h1 className='TagTitle'>Animal Identified! The animal in your photo is:</h1>
            <ul>
            {props.tags.map((tag, i) => <ListComponent key={i} tag={tag} />)}
            </ul>
            </div>
        </div>
    )

}

export default NewImage;