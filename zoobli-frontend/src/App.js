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
    currentImage: '',
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
    event.target.first_name.value = ''
    event.target.last_name.value = ''
    event.target.username.value = ''
    event.target.password.value = ''
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
      event.target.username.value = ''
      event.target.password.value = ''
  }

  handleImageForm = (event) => {
    event.preventDefault()
    const image_url = event.target.image_url.value
    this.postImagetoAPI(image_url)
    event.target.image_url.value = ''
  }

  postImagetoAPI = (image_url) => {
    const image = {
      image_url: image_url,
      user_id: this.state.currentUser.id
    }
    API.createImage(image)
    .then(data => this.setState({ currentImage: data }))
    API.postToGoogle(image_url)
    .then(data => data.responses[0].labelAnnotations.map(tag => this.saveTag(tag.description)))
  }

  saveTag (tagName) {
    API.getTags()
    .then(data => {
      const currentTag = data.find(tag => tag.name.toString() === tagName.toString())
      if (!currentTag) {
        API.postTag({ name: tagName })
          .then(newTag => {
            API.postScore(newTag, this.state.currentImage)
            API.postToWiki(newTag)
        })
      } else {
        API.postScore(currentTag, this.state.currentImage)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          < NavBar />
          { localStorage.token
          ?
          <div>
          < ImageForm handleImageForm={this.handleImageForm}/>
          </div>
          :
          < FormHolder handleSignUp={this.handleSignUp} handleLogin={this.handleLogin}/>
          }
          < ImageBrowser images={this.state.images}/>
        </header>
      </div>
    );
  }
}

export default App;
