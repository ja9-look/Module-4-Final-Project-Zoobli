import React from 'react';

const ImageCard = (props) => {

    return (
        <div className="ImageCard">
            <img src={props.image.image_url} alt="" />
        </div>
    )

}

export default ImageCard