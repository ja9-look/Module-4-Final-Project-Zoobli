import React, { Component } from 'react';
import NavBar from './containers/NavBar';
import ImageBrowser from './containers/ImageBrowser';
import ImageForm from './components/ImageForm';
import FormHolder from './containers/FormHolder';
import logo from './zoobli_logo.png';
import './App.css';

import API from './adapters/API'

class App extends Component {

  state = {
    currentUser: '',
    images: [],
    showSign: 'up'
  }

  login = (data) => {
    localStorage.setItem('token', data.jwt)
    this.setState({ currentUser: data.user }, this.getImages) 
  }

  logout = () => {
    localStorage.removeItem('token')
  }

  getImages = () =>
    API.getImages()
    .then(images => { 
      this.setState({ images })
   })

  componentDidMount() {
    if (localStorage.token) {
        API.getCurrentUser().then(data => {
          this.setState({ currentUser: data.user })
          this.getImages()
        }
        )
  }
}

  handleSignUp = (event) => {
    event.preventDefault() 
    const newUser = {
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      username: event.target.username.value,
      password: event.target.password.value
    }
    this.createUser(newUser)
  }

  createUser = (newUser) => {
    API.createUser(newUser)
      .then(data => this.login(data))
  }

  handleLogin = event => {
    event.preventDefault()
    const currentUser = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    API.login(currentUser)
      .then(data => this.login(data))
  }

  handleImageForm = (event) => {
    event.preventDefault()
    const image_url = event.target.image_url.value
    this.postImagetoAPI(image_url)
  }

  postImagetoAPI = (image_url) => {
    const image = {
      image_url: image_url,
      user_id: this.state.currentUser.id
    }
    API.createImage(image)
    API.postToGoogle(image_url)
    .then(data => data.responses[0].labelAnnotations.map(tag => this.saveTag(tag.description)))
  }

  saveTag (tagName) {
    API.getTags()
    .then(data => {
      if (!data.find(tag => tag.name.toString() === tagName.toString())) {
        API.postTag({ name: tagName })
      }
    }) 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" />
          < NavBar />
          <div>
            < FormHolder handleSignUp={this.handleSignUp} handleLogin={this.handleLogin}/>
          </div>
          { localStorage.token
          ?
          <div>
          < ImageForm handleImageForm={this.handleImageForm}/>
          < ImageBrowser images={this.state.images}/>
          </div>
          :
          null
          }
  
        </header>
      </div>
    );
  }
}

export default App;
