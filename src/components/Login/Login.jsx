import React from 'react'
import {Redirect, Route} from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props)
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
    this.props.loginUser({
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
      <div className="login">
        <form className="login__form">
          <p className="login__title">Вход</p>
          <input onChange={this.handleChangeEmail}
                 type="email"
                 placeholder="Email"
                 className="login__input"/>
          <input onChange={this.handleChangePassword}
                 type="password"
                 placeholder="Пароль"
                 className="login__input"/>
          <button onClick={this.handleSubmit}
                  type="button"
                  className="login__submit-button">Войти
          </button>
        </form>
      </div>
    )
  }
}