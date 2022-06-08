class Api {
  constructor(options) {
    this._url = options.url;
    this._url = options.headers;
  }

  _getIngridients() {
    return fetch(`$this._url`, {
      method: 'POST',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
  }
}

export const api = new Api({
  url: 'https://norma.nomoreparties.space/api/ingredients',
  headers: {
    'Content-Type': 'application/json'
  }
})
