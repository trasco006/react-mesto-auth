import React from 'react';
import './Header.css'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this)
  }

  render() {

    return (
      <header className="header">
        <div className="header__logo"/>
        {this.props.loggedIn === true ? (<div className="header__status-bar bar">
          <a href="#" className="bar__email">{this.props.userEmail}</a>
          <a href="#" className="bar__action bar__action_logged">Выйти</a>
        </div>) : (
          window.location.pathname === '/sign-in' ? (
              <div className="header__status-bar bar">
                <a href="/sign-up" className="bar__action">
                  Регистрация
                </a>
              </div>) :
            (
              <div className="header__status-bar bar">
                <a href="/sign-in" className="bar__action">
                  Войти
                </a>
              </div>)

        )
        }
      </header>)
  }
}

export default Header