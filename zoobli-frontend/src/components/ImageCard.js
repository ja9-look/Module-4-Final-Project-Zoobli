import React from 'react';

const ImageCard = (props) => {

    return (
        <div className='TagCard'>
            <img className='ImageCard' src={props.image.image_url} alt=""/>
        </div>
    )

}

export default ImageCard