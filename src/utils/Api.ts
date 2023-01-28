import { IInputValues } from "../hooks/useForm";
import { IAuth } from "../services/types";

interface IOptions {
  url: string;
  headers: {
    [key: string]: string,
  },
}

class Api {
  _url: string;
  _headers: { [key: string]: string; };
  constructor(options: IOptions) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res: { ok: any; json: () => any; status: any; }){
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  _request(url: string, options: RequestInit | undefined) {
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
  setOrderDetails(data: Array<string>, accessToken: string) {
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
    getOrderUserDetails(id: string) {
      return this._request(`${this._url}/orders/${id}`, {
        method: 'GET',
        headers: this._headers,
      })
    }

  //проверка, зарегистрирован ли пользователь в системе
  getEmails(data: string) {
    return this._request(`${this._url}/password-reset`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "email": data
      })
    })
  }

  //восстановление пароля
  resetPassword(data: IInputValues) {
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
  async login(data: IAuth) {
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
  async register(data: IInputValues) {
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
  async logout(data: string) {
    return await this._request(`${this._url}/auth/logout`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "token": data
      })
    })
  }

  //обновление токена
  async refreshToken(refreshToken: string) {
    return await this._request(`${this._url}/auth/token`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "token": refreshToken
      })
    })
  }

  //получение данных о пользователе
  async getUser(accessToken: string | null) {
    return await this._request(`${this._url}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "authorization": 'Bearer ' + accessToken
      },
    })
  }

  //обновление данных пользователя
  async patchUser(data: IAuth & {name: string}, accessToken: string) {
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
