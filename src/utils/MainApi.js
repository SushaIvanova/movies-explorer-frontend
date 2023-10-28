
class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return res.json();
  }

  getSavedMovies(token) {
    return fetch(`${this._url}/movies`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._getResponseData);
  }

  register = (name, password, email) => {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        email: email, 
        name: name
      })
    })
    .then(this._getResponseData)
  };

  authorize = (password, email) => {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        email: email, 
      })
    })
    .then(this._getResponseData)  
  };

  getContent = (token) => {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
      
    })
    .then(res => res.json())
  }
  
  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._getResponseData);
  }

  editProfile(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    })
    .then(this._getResponseData);
  }

  saveCard(data, token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        description: data.description,
        year: data.year,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        movieId: data.id,
      })
    })
    .then(this._getResponseData);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._getResponseData)
  }
}

const mainApi = new MainApi({
  // baseUrl: 'http://localhost:3002',
  baseUrl: 'https://yp23.movie.nomoredomainsicu.ru',
});

export {mainApi};