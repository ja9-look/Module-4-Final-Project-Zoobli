import React from 'react';

const ImageBrowser = props => {

    return (
        <div>
            {props.images.map(image => 
        <ImageCard key={image.id} image={image} />    
        )}
        </div>
    )

}

export default ImageBrowser