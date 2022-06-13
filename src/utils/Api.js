class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getIngridients() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }
}

export const api = new Api({
  url: 'https://norma.nomoreparties.space/api/ingredients',
  headers: {
    'Content-Type': 'application/json'
  }
})
