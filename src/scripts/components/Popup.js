import {inputName, inputSubtitle} from "../utils/constants";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupEscapeButton = this._popup.querySelector('.popup_close_button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  setEventListeners() {
    this._popupEscapeButton.addEventListener('click', ()=>(this.close()))
  }

  open() {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }

  }

}



