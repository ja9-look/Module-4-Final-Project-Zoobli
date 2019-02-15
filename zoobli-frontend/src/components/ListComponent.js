import React, { Component } from 'react';
import API from '../adapters/API'

class ListComponent extends Component {

    state = {
        showDesc: false,
        description: {}
    }

    componentDidMount() {
        API.getDescriptions().then(data => {
            console.log(' this.props.tag.id',  this.props.tag.id);
            this.setState({ description: data.find(descr => descr.tag_id == this.props.tag.id) }, () => console.log(this.state.description))
        })
    }

    handleClick = () => this.setState({ showDesc: !this.state.showDesc })

    render() {
        if (!this.state.showDesc) {
        return (
        <li onClick={this.handleClick}>{this.props.tag.name}</li>
        )
        } else {
        return (
        <li onClick={this.handleClick}>{this.state.description.content}</li>    
        )
        }
    }

}

export default ListComponent