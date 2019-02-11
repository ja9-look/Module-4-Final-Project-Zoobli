import React, { Component } from 'react';
import NavBar from './containers/NavBar';
import ImageBrowser from './containers/ImageBrowser';
import ImageForm from './components/ImageForm';
import logo from './zoobli_logo.png';
import './App.css';

const baseURL = "http://localhost:3001/"

class App extends Component {

  state= {
    currentUserId: 2,
    images: []
  }


  componentDidMount() {
    return fetch(baseURL + "images")
    .then(res => res.json())
    .then(data => this.setState({
      images: data
    }))
  }

  handleImageForm = (event) => {
    event.preventDefault()
    const image_url = event.target.image_url.value
    this.state.currentUserId && this.postImgtoAPI(image_url)
  }

  postImgtoAPI = (image_url) => {
    return fetch(baseURL + "images",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: this.state.currentUserId,
      image_url: image_url
    })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" />
          < NavBar />
          < ImageForm handleImageForm={this.handleImageForm}/>
          < ImageBrowser images={this.state.images}/>
        </header>
      </div>
    );
  }
}

export default App;
