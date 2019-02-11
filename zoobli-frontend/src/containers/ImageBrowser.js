import React from 'react';
import ImageCard from '../components/ImageCard';

const ImageBrowser = (props) => {
    console.log(props)
    
    return (
        <div className="ImageContainer">
            {props.images.map(image => 
                <ImageCard key={image.id} image={image} />    
            )}
        </div>
    )
}

export default ImageBrowser