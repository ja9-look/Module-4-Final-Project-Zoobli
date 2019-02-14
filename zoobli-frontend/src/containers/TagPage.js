import React, { Component } from 'react';
import API from '../adapters/API';

class TagPage extends Component {

    state = {
        description: {}
    }

    componentDidMount() {
        API.getDescriptions().then((data) => {
            this.setState({ description: data.find(descr => descr.tag_id === this.props.tag.id) })
        })  
    }
    
    render() {
        return (
        <div>
        <button onClick={this.props.handleClick}>Back</button>
        <header>{this.props.tag.name}</header>
        <p>{this.state.description.content}</p>
        </div>
        )
    }

}

export default TagPage