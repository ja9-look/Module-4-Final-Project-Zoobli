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
            this.setState({image: this.props.images.find(i => i.id === score.image_id)})
        })   
    }

    render() {
        return (
        <div>
        <img src={this.state.image.image_url} alt=""/>
        </div>
        )
    }

}

export default TagCard

