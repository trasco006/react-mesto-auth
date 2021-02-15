import React from 'react'
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export class EditAvatarPopup extends React.Component {
  constructor(props) {
    super(props);
    this.avatarRef = React.createRef()
    this.state = {
      name: "avatar",
      title: "Изменение аватара",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onUpdateAvatar(this.avatarRef.current.value);
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
            <input id="input-avatar-url"
                   type="url"
                   ref={this.avatarRef}
                   name="avatar-src"
                   autoComplete="off"
                   placeholder="Ссылка на картинку"
                   required
                   className="popup__input popup-avatar__input  form__input  form__input_src form__input_first form__input_second"
                   tabIndex="0"/>
            <span id="input-avatar-url-error"/>
          </div>}/>
    )
  }
}
