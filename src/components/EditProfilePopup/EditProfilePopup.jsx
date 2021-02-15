import React from 'react'
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

export default class EditProfilePopup extends React.Component {
  static contextType = CurrentUserContext

  constructor(props) {
    super(props);
    this.render = this.render.bind(this)
    this.state = {
      name: 'profile',
      title: 'Редактировать профиль',
      inputUserName: '',
      inputUserAbout: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.render = this.render.bind(this)
    this.handleChangeUserAbout = this.handleChangeUserAbout.bind(this)
    this.handleChangeUserName = this.handleChangeUserName.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onUpdateUser({
      name: this.state.inputUserName,
      about: this.state.inputUserAbout
    });
  }

  handleChangeUserName(event) {
    this.setState({
      inputUserName: event.target.value
    });
  }

  handleChangeUserAbout(event) {
    this.setState({
      inputUserAbout: event.target.value
    });
  }

  render() {
    return (
      <PopupWithForm
        closeAllPopups={this.props.onClose}
        onSubmit={this.handleSubmit}
        isOpen={this.props.isOpen}
        name={this.state.name}
        title={this.state.title}
        children={
          <div className="popup__input-box">
            <input id="input-name"
                   type="text"
                   name="user"
                   placeholder="Имя"
                   autoComplete="off"
                   minLength="2"
                   maxLength="40"
                   className="popup__input form__input  form__input_first form__input_name"
                   tabIndex="0"
                   onChange={this.handleChangeUserName}
                   value={this.state.inputUserName}
                   required/>
            <span id="input-name-error"
                  className="popup__error"/>
            <input onChange={this.handleChangeUserAbout}
                   value={this.state.inputUserAbout}
                   id="input-subtitle"
                   type="text"
                   name="about-user"
                   placeholder="О себе"
                   autoComplete="off"
                   minLength="2"
                   required
                   className="form__input_second popup__input form__input form__input_subtitle"
                   tabIndex="0"/>
            <span id="input-subtitle-error"
                  className="popup__error"/>
          </div>}/>
    )
  }
}