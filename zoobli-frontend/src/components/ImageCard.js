import React, {Component} from 'react';

class ImageCard extends Component {

    imagePopUpHandler = (event) => {
        event.target.classList.toggle('popup')
    }

    render () {

        return (
            <div className='TagCard' onClick={this.imagePopUpHandler} >
                <img className='ImageCard' src={this.props.image.image_url} alt=""/>
            </div>  
        )   
    }

}


export default ImageCard