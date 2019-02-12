import { SlowBuffer } from "buffer";

class API {
    static init () {
        this.baseURL = "http://localhost:3001/api/v1"
        this.usersURL = this.baseURL + '/users'
        this.loginURL = this.baseURL + '/login'
        this.imagesURL = this.baseURL + '/images'
        this.profileURL = this.baseURL + '/profile'
    }

    static login (user) {
        return this.post(this.loginURL, { user })
    }

    static createUser (user) {
        return this.post(this.usersURL, { user })
    }

    static getCurrentUser () {
        return this.get(this.profileURL)
    }

    static getImages () {
        return this.get(this.imagesURL)
    }

    static createImage (image) {
        console.log(image)
        return this.post(this.imagesURL, { image })
    }

    static post (url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then(data => data.json())
    }

    static get (url) {
        return fetch(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(resp => resp.json())
    }
}

API.init()

export default API
