class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res){
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponse)
  }

  //получение всех ингредиентов
  getIngredients() {
    return this._request(`${this._url}/ingredients`, {
      method: 'GET',
      headers: this._headers
    })
  }

  //отправка заказа на сервер
  setOrderDetails(data, accessToken) {
    return this._request(`${this._url}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        "ingredients": data,
      })
    })
  }

  //получение информации о заказе с сервера
    getOrderUserDetails(id) {
      return this._request(`${this._url}/orders/${id}`, {
        method: 'GET',
        headers: this._headers,
      })
    }

  //проверка, зарегистрирован ли пользователь в системе
  getEmails(data) {
    return this._request(`${this._url}/password-reset`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email": data
      })
    })
  }

  //восстановление пароля
  resetPassword(data) {
    return this._request(`${this._url}/password-reset/reset`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": data.password,
        "token": data.token
      })
    })
  }

  //авторизацмя в системе
  async login(data) {
    return await this._request(`${this._url}/auth/login`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email": data.email,
        "password": data.password
      })
    })
  }

  //регистрация в системе
  async register(data) {
    return await this._request(`${this._url}/auth/register`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email": data.email,
        "password": data.password,
        "name": data.name
      })
    })
  }

  //выход из системы
  async logout(data) {
    return await this._request(`${this._url}/auth/logout`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "token": data
      })
    })
  }

  //обновление токена
  async refreshToken(refreshToken) {
    return await this._request(`${this._url}/auth/token`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "token": refreshToken
      })
    })
  }

  //получение данных о пользователе
  async getUser(accessToken) {
    return await this._request(`${this._url}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "authorization": 'Bearer ' + accessToken
      },
    })
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
}

export const api = new Api({
  url: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
})
