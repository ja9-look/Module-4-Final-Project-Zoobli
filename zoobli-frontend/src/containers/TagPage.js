import React, { Component } from 'react';
import API from '../adapters/API';
import ImageBrowser from './ImageBrowser';

class TagPage extends Component {

    state = {
        description: {},
        images: []
    }

    componentDidMount() {
        API.getDescriptions().then((data) => {
            this.setState({ description: data.find(descr => descr.tag_id === this.props.tag.id) })
        })
        this.props.scores.then(data => data.forEach(score => {
            this.setState({ images: [...this.state.images, this.props.allImages.find(image => image.id === score.image_id)] })
        }))  
    }
    
    render() {
        return (
        <div>
            <button className='BackButton' onClick={this.props.handleClick}>Back</button>
            <div className='InfoDiv'>
            <header className='TagTitle'>{this.props.tag.name}</header>
            <p className='TagP'>{this.state.description.content}</p>
            </div>
            <div className="ImageContainer2">
                <ImageBrowser images={this.state.images} />
            </div>
        </div>
        )
    }

}

export default TagPage