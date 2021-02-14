import React from 'react'
import {Redirect, Route} from "react-router-dom";

export default class Login extends React.Component{
  // constructor() {
  //   super();
  // }

    render() {
    return (
      <div className="login">
        <form className="login__form">
          <p className="login__title" >Вход</p>
          <input type="email" placeholder="Email" className="login__input"/>
          <input type="password" placeholder="Пароль" className="login__input"/>
          <button className="login__submit-button">Войти</button>
        </form>
      </div>
    )
  }
}