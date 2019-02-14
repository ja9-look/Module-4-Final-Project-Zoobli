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
        <button onClick={this.props.handleClick}>Back</button>
        <header>{this.props.tag.name}</header>
        <p>{this.state.description.content}</p>
        <ImageBrowser images={this.state.images} />
        </div>
        )
    }

}

export default TagPage