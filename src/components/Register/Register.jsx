import React from 'react'
import {Redirect} from "react-router-dom";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      inputPassword: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.render = this.render.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.regNewUser({
      email: this.state.inputEmail,
      password: this.state.inputPassword
    })
  }

  handleChangeEmail(event) {
    this.setState({
      inputEmail: event.target.value
    })
  }

  handleChangePassword(event) {
    this.setState({
      inputPassword: event.target.value
    })
  }

  render() {
    return (
      <div className="register">
        <form onSubmit={this.handleSubmit}
              className="register__form">
          <p className="register__title">Регистрация</p>
          <input type="email"
                 onChange={this.handleChangeEmail}
                 value={this.state.inputEmail}
                 placeholder="Email"
                 className="register__input"/>
          <input type="password"
                 onChange={this.handleChangePassword}
                 value={this.state.inputPassword}
                 placeholder="Пароль"
                 className="register__input"/>
          <button type="submit"
                  className="register__submit-button">Зарегистрироваться
          </button>
        </form>
        <p className="register__recheck">Уже зарегистрированы?
          <a href="/sign-in"
             className="register__link">Войти</a>
        </p>
      </div>
    )
  }
}