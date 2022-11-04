class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res){
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getIngridients() {
    return fetch(`${this._url}/ingredients`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponse(res))
  }

  setOrderDetails(data) {
    return fetch(`${this._url}/orders`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "ingredients": data
      })
    })
      .then(res => this._getResponse(res))
  }

  //проверка, зарегистрирован ли пользователь в системе
  getEmails(data) {
    return fetch(`${this._url}/password-reset`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email": data
      })
    })
      .then(res => this._getResponse(res))
  }

  //восстановление пароля
  resetPassword(data) {
    return fetch(`${this._url}/password-reset/reset`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": data.password,
        "token": data.token
      })
    })
      .then(res => this._getResponse(res))
  }

  //авторизацмя в системе
  async login(data) {
    return await fetch(`${this._url}/auth/login`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email": data.email,
        "password": data.password
      })
    })
      .then(res => this._getResponse(res))
  }

  //регистрация в системе
  async register(data) {
    return await fetch(`${this._url}/auth/register`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email": data.email,
        "password": data.password,
        "name": data.name
      })
    })
      .then(res => this._getResponse(res))
  }

  //выход из системы
  async logout(data) {
    return await fetch(`${this._url}/auth/logout`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "token": data
      })
    })
      .then(res => this._getResponse(res))
  }

  //обновление токена
  async refreshToken(refreshToken) {
    return await fetch(`${this._url}/auth/token`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "token": refreshToken
      })
    })
      // .then(res => res.ok ? res.json() : res.json())
      .then(res => this._getResponse(res))
  }

  //получение данных о пользователе
  async getUser(accessToken) {
    return await fetch(`${this._url}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "authorization": 'Bearer ' + accessToken
      },
    })
      .then(res => this._getResponse(res))
  }

  //обновление данных пользователя
  async patchUser(data, accessToken) {
    return await fetch(`${this._url}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "authorization": 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        "email" : data.email,
        "name": data.name,
        "password": data.password
      }),
    })
      .then(res => res.ok ? res.json() : res.json())
  }

  //получение 50 последних заказов
  async getOrders() {
    return await fetch(`${this._url}/orders/all`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(res => this._getResponse(res))
  }
}

export const api = new Api({
  url: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
})
