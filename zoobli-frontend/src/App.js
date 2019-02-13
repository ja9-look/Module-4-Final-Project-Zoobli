import React, { Component } from 'react';
import NavBar from './containers/NavBar';
import TagBrowser from './containers/TagBrowser';
import ImageForm from './components/ImageForm';
import FormHolder from './containers/FormHolder';
import './App.css';

import API from './adapters/API'

class App extends Component {

  state = {
    currentUser: '',
    currentImage: '',
    images: [],
    tags: [],
    showSign: 'up'
  }

  login = (data) => {
    localStorage.setItem('token', data.jwt)
    this.setState({ currentUser: data.user }, this.getImages) 
  }

  logout = () => {
    localStorage.removeItem('token')
    this.getImages()
  }

  getImages = () =>
    API.getImages()
    .then(images => { 
      this.setState({ images })
   })

  componentDidMount() {
    console.log("Component did mount")
    if (localStorage.token) {
        API.getCurrentUser().then(data => {
          this.setState({ currentUser: data.user })
          this.getImages()
          this.getTags()
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
    .then(data => {
      this.setState({ currentImage: data })
      this.getImages()
    })
    API.postToGoogle(image_url)
    .then(data => data.responses[0].labelAnnotations.map(tag => this.saveTag(tag.description)))
  }

  saveTag (tagName) {
    API.getTags()
    .then(data => {
      const currentTag = data.find(tag => tag.name.toString() === tagName.toString())
      if (!currentTag) {
        API.postTag({ name: tagName })
          .then(newTag => this.saveScoreGetDescription(newTag))
      } else {
        API.postScore({ tag_id: currentTag.id, image_id: this.state.currentImage.id })
      }
    })
  }

  saveScoreGetDescription = (tag) => {
    API.postScore({ tag_id: tag.id, image_id: this.state.currentImage.id })
    API.postToWiki(tag)
    .then(data => {
      const desc = data[2]
      API.postDescription({ tag_id: tag.id, content: desc[0] })
    })
  }

  getTags = () => {
    return API.getTags().then(data => this.setState({ tags: data}))
  }

  onToggleClick = () => {
    const menu = document.querySelector('.menu')
    menu.classList.toggle("visible")
  }

  handleSignUpFormClick = () => {
    const signUpForm = document.querySelector('.signUpForm')
    const loginForm = document.querySelector('.loginForm')
    signUpForm.classList.toggle('hidden')
  }

  handleLoginFormClick = () => {
    const loginForm = document.querySelector('.loginForm')
    const signUpForm = document.querySelector('.signUpForm')
    loginForm.classList.toggle('hidden')
  }


  render() {
    console.log(this.state.images)
    return (
      <div className="App">
        <header className="App-header">
          < NavBar onToggleClick={this.onToggleClick} handleSignUpFormClick={this.handleSignUpFormClick} handleLoginFormClick={this.handleLoginFormClick} logout={this.logout}/>
          { localStorage.token
          ?
          <div>
          < ImageForm handleImageForm={this.handleImageForm}/>
          </div>
          :
          < FormHolder handleSignUp={this.handleSignUp} handleLogin={this.handleLogin}/>
          }
          < TagBrowser images={this.state.images} tags={this.state.tags} />
        </header>
      </div>
    );
  }
}

export default App;
