import Popup from "./Popup.js"
import Card from "./Card.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage =   this._popup.querySelector('.popup-image__item')
  }

  open(link, name) {
    super.open()
    this._popupImage.src = link;
    this._popupImage.alt = name;
    document.querySelector('.popup-image__title').textContent = name;
  }
}