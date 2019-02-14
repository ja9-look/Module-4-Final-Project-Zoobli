import React, { Component } from 'react'
// import API from '../adapters/API'

class TagCard extends Component {

    state = {
        image: {}
    }

    randomElement = arrayLength => Math.floor(Math.random() * arrayLength)

    componentDidMount() {
        this.props.scores.then((data) => {
            const score = data[this.randomElement(data.length)]
            score && 
            this.setState({image: this.props.images.find(i => i.id === score.image_id)})
        })   
    }

    render() {
        return (
        <div className='TagCard'>
        <img className='ImageCard' src={this.state.image.image_url} alt=""/>
        <p onClick={this.props.handleClick} >{this.props.tag.name}</p>
        </div>
        )
    }

}

export default TagCard

