class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getIngridients() {
    return fetch(`${this._url}/ingredients`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  setOrderDetails(data) {
    return fetch(`${this._url}/orders`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "ingredients": data
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  getEmails(data) {
    return fetch(`${this._url}/password-reset`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email": data
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  resetPassword(password, token) {
    console.log("password =", password);
    console.log("token =", token);
    return fetch(`${this._url}/password-reset/reset`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "token": token
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }
}

export const api = new Api({
  url: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
})
