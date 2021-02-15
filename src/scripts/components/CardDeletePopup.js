import {PopupWithForm} from "./PopuWithForm";

class CardDeletePopup extends PopupWithForm{
  deleteCard(action) {
    this._submitFunction = action
  }
}
export default CardDeletePopup