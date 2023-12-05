class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getMovies() {
    return fetch(`${this._url}`, {
      headers: {
        // "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._getResponseData);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export {moviesApi};