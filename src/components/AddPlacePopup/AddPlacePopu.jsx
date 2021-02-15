import React from 'react'
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export class AddPlacePopu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "place",
      title: "Новое место",
      cardName: '',
      cardLink: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.render = this.render.bind(this)
    this.handleChangeCardLink = this.handleChangeCardLink.bind(this)
    this.handleChangeCardName = this.handleChangeCardName.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log({
      name: this.state.cardName,
      link: this.state.cardLink
    })
    this.props.onAddPlace({
      name: this.state.cardName,
      link: this.state.cardLink
    });
  }

  handleChangeCardName (evt) {
    this.setState({
      cardName: evt.target.value
    })
  }

  handleChangeCardLink (evt) {
    this.setState({
      cardLink: evt.target.value
    })
  }

  render() {
    return (
      <PopupWithForm
        closeAllPopups={this.props.onClose}
        isOpen={this.props.isOpen}
        onSubmit={this.handleSubmit}
        name={this.state.name}
        title={this.state.title}
        children={
          <div className="popup__input-box">
            <input id="input-card-name"
                   onChange={this.handleChangeCardName}
                   value={this.state.cardName}
                   type="text"
                   minLength="1"
                   maxLength="30"
                   name="card-name"
                   autoComplete="off"
                   placeholder="Название"
                   required
                   className=" popup__input popup-card__input  form__input   form__input_name  form__input_first"
                   tabIndex="0"/>
            <span id="input-card-name-error"
                  className="popup__error "/>
            <input id="input-url"
                   onChange={this.handleChangeCardLink}
                   value={this.state.cardLink}
                   type="url"
                   name="card-src"
                   autoComplete="off"
                   placeholder="Ссылка на картинку"
                   required
                   className="popup__input popup-card__input  form__input  form__input_src form__input_second"
                   tabIndex="0"/>
            <span id="input-url-error" className="popup__error "/>
          </div>
        }/>
    )
  }
}
