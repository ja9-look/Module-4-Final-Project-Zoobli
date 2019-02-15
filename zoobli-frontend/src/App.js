import React, { Component } from 'react';
import NavBar from './containers/NavBar';
import TagBrowser from './containers/TagBrowser';
import ImageForm from './components/ImageForm';
import FormHolder from './containers/FormHolder';
import TagPage from './containers/TagPage'
import './App.css';

import API from './adapters/API'

class App extends Component {

  state = {
    currentUser: '',
    currentImage: '',
    currentTag: '',
    images: [],
    tags: [],
    filteredTags: [],
    renderAllTags: true,
    newImage: false,
    newTags: []
  }

  login = (data) => {
    localStorage.setItem('token', data.jwt)
    this.setState({ currentUser: data.user })
    this.getImages().then(this.getTags())
  }

  logout = () => {
    localStorage.removeItem('token')
    this.setState({ filteredTags: [] })
    this.getImages()
  }

  getImages = () =>
    API.getImages()
    .then(images => { 
      this.setState({ images })
   })

  componentDidMount() {
    if (localStorage.token) {
        API.getCurrentUser().then(data => {
          this.setState({ 
            currentUser: data.user
           })
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
      this.setState({ 
        currentImage: data
       })
      this.getImages()
    })
    API.postToGoogle(image_url)
    .then(data => data.responses[0].labelAnnotations.map(tag => {
      this.saveTag(tag.description)
    }))
  }

  saveTag (tagName) {
    let currentTag
    API.getTags()
    .then(data => {
      currentTag = data.find(tag => tag.name.toString() === tagName.toString())
      if (!currentTag) {
        API.postTag({ name: tagName })
          .then(newTag => {
            this.saveScoreGetDescription(newTag)
            currentTag = newTag
          })
      } else {
        API.postScore({ tag_id: currentTag.id, image_id: this.state.currentImage.id })
        this.setState({ 
          newTags: [...this.state.newTags, currentTag],
          newImage: true
        })
      }
    })
  }

  saveScoreGetDescription =  (tag) => {
    API.postScore({ tag_id: tag.id, image_id: this.state.currentImage.id })
    API.postToWiki(tag)
    .then(async data => {
      const desc = data[2]
       await API.postDescription({ tag_id: tag.id, content: desc[0] })
      this.setState({ 
        newTags: [...this.state.newTags, tag],
        newImage: true
      })
    })
  }

  getTags = () => {
    return API.getTags().then(data => 
      this.setState({ 
      tags: data,
      filteredTags: data
    }))
  }

  handleSearch = (event) => {
    event.preventDefault()
    const searchTerm = event.target.value.toLowerCase()
    const filteredTags = this.state.tags.filter(tag => tag.name.toLowerCase().includes(searchTerm))
    this.setState({ filteredTags: filteredTags })
  }

  onToggleClick = () => {
    const menu = document.querySelector('.menu')
    menu.classList.toggle("visible")
  }

  toggleMenu = () => {
    const collapsibleForm = document.querySelector('.collapsible_forms')
    collapsibleForm.classList.toggle('hidden')
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

  showTagInfo = (tag) => {
    this.setState({ 
      renderAllTags: false,
      currentTag: tag
     })
  }

  imagePopUp = () => {
    const tagCard = document.querySelector('.TagCard')
    tagCard.classList.toggle('popup')
  }

  showAllTags = () => {
    this.setState({ 
      renderAllTags: true,
      newImage: false,
      newTags: []
    })
  }

  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          < NavBar onToggleClick={this.onToggleClick} handleSignUpFormClick={this.handleSignUpFormClick} handleLoginFormClick={this.handleLoginFormClick} logout={this.logout} toggleMenu={this.toggleMenu}/>
          { localStorage.token
          ?
          <div>
          < ImageForm submitImage={this.postImagetoAPI} onChange={this.handleSearch} handleImageForm={this.handleImageForm}/>
          </div>
          :
          < FormHolder handleSignUp={this.handleSignUp} handleLogin={this.handleLogin}/>
          }
          { this.state.renderAllTags
          ?
          < TagBrowser newTags={this.state.newTags} handleBackClick={this.showAllTags} image={this.state.currentImage} newImage={this.state.newImage} images={this.state.images} tags={this.state.filteredTags} handleClick={this.showTagInfo}/>
          :
          < TagPage tag={this.state.currentTag} handleClick={this.showAllTags} scores={API.getScoresFromTag(this.state.currentTag.id)} allImages={this.state.images} />
          }
        </header>
      </div>
    );
  }
}

export default App;
