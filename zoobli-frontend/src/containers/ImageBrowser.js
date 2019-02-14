import React from 'react';
import ImageCard from '../components/ImageCard';

const ImageBrowser = props => {
   
    return (
        <div className='ImageContainer3'>
        {props.images.map(image => 
            <ImageCard key={image.id} image={image} />     
        )}
        </div>
    )
}

export default ImageBrowser