import React from 'react'
import {Redirect} from "react-router-dom";

export default class Register extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div className="register">
        <form className="register__form">
          <p className="register__title">Регистрация</p>
          <input type="email" placeholder="Email" className="register__input"/>
          <input type="password" placeholder="Пароль" className="register__input"/>
          <button className="register__submit-button">Зарегистрироваться</button>
        </form>
        <p className="register__recheck">Уже зарегистрированы?
          <a href="/sign-in"  className="register__link">Войти</a>
        </p>
      </div>
    )
  }
}