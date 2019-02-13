import googleAPIKey from '../key'

class API {

    static init () {
        this.baseURL = "http://localhost:3001/api/v1"
        this.usersURL = this.baseURL + '/users'
        this.loginURL = this.baseURL + '/login'
        this.imagesURL = this.baseURL + '/images'
        this.tagsURL = this.baseURL + '/tags'
        this.scoresURL = this.baseURL + '/scores'
        this.descriptionsURL = this.baseURL + '/descriptions'
        this.profileURL = this.baseURL + '/profile'
        this.wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="
        this.googleURL = `https://vision.googleapis.com/v1/images:annotate?key=${googleAPIKey}`
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
        return this.post(this.imagesURL, { image })
    }

    static getTags () {
        return this.get(this.tagsURL)
    }

    static postTag (tag) {
        return this.post(this.tagsURL, { tag })
    }

     static async getScoresFromTag (id) {
        const data = await this.get(this.scoresURL)
        const scores = data.filter(s => s.tag_id === id)
        return scores
    }

    static postScore (score) {
        return this.post(this.scoresURL, { score })
    }

    static getDescriptions () {
        return this.get(this.descriptionsURL)
    }

    static postDescription (description) {
        // console.log(description)
        return this.post(this.descriptionsURL, { description })
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

     static async get (url) {
        return await fetch(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(resp => resp.json())
    }

    static postToGoogle (image_url) {
        return fetch(this.googleURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              requests: [{
                image: {
                  source: {
                    imageUri: image_url
                  }
                },
                features: [{
                  type: 'LABEL_DETECTION',
                  maxResults: 10
                }]
              }]
            })
          })
          .then(resp => resp.json())
      }

    static postToWiki(tag) {
        return fetch(this.wikiURL + tag.name)
        .then(res => res.json())
    }

}


API.init()

export default API
