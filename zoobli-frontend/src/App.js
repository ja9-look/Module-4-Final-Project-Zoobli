import React, { Component } from 'react';
import NavBar from './containers/NavBar';
import ImageBrowser from './containers/ImageBrowser';
import ImageForm from './components/ImageForm';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import logo from './zoobli_logo.png';
import './App.css';

import API from './adapters/API'

class App extends Component {

  state = {
    currentUser: '',
    images: []
  }

  login = (data) => {
    localStorage.setItem('token', data.jwt)
    localStorage.setItem('currentUserId', data.user.id)
    this.setState({ currentUser: data.user })
  }

  logout = () => {
    localStorage.removeItem('currentUserId')
    localStorage.removeItem('token')
  }

  getImages = () => {
    API.getImages()
      .then(images => this.setState({ images }))
  }

  componentDidMount() {
    this.getImages() 
    API.getCurrentUser(localStorage.getItem('currentUserId'))
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
    this.postImgtoAPI(image_url)
  }

  postImgtoAPI = (image_url) => {
    const image = {
      image_url: image_url,
      user_id: localStorage.getItem('currentUserId')
    }
    API.createImage(image)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" />
          < NavBar />
          < SignUpForm handleSignUp={this.handleSignUp}/>
          < LoginForm handleLogin={this.handleLogin}/>
          < ImageForm handleImageForm={this.handleImageForm}/>
          {/* < ImageBrowser images={this.state.images}/> */}
        </header>
      </div>
    );
  }
}

export default App;
