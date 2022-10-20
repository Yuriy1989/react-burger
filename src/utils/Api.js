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

  //проверка, зарегистрирован ли пользователь в системе
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
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  //авторизацмя в системе
  async login(data) {
    return await fetch(`${this._url}/auth/login`, {
      method: 'POST',
      // mode: 'cors',
      // cache: 'no-cache',
      // credentials: 'same-origin',
      headers: this._headers,
      // redirect: 'follow',
      // referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        "email": data.email,
        "password": data.password
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
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
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
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
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  //обновление токена
  async token(token) {
    return await fetch(`${this._url}/auth/token`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "token": token
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  //получение данных о пользователе
  async getUser(token) {
    console.log('api token', token);
    return await fetch(`${this._url}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        "authorization": 'Bearer ' + token
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  //обновление данных пользователя
  async patchUser(data) {
    return await fetch(`${this._url}/auth/user`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSOM.stringify({
        "authorization": data.token,
        "user": {
          "email" : data.email,
          "name": data.name,
        }
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
