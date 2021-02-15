import React from "react";

class Authentication extends React.Component {
  constructor(config) {
    super()
    this._baseUrl = config.url;
    this._headers = config.headers;
  }

// Обработка ошибок в запросах
  _controlError(promise) {
    return promise.then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      } else {
        return res.json()
      }
    })
  }

// Регистрация нового пользователя
  signUp(data) {
    const promise = fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
    return this._controlError(promise)
  }

// Вход
  signIn(data) {
    const promise = fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })

    return this._controlError(promise)
  }

// Проверка валидности токена
  checkToken(token) {
    const promise = fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    return this._controlError(promise)
  }
}

const auth = new Authentication({
  url: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json"
  }
})

export default auth