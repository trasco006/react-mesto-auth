import {
  inputName,
  profileSubtitle,
  inputSubtitle,
  editButton,
} from "../utils/constants.js"
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import {api} from "../../pages";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._firstInput = this._popup.querySelector('.form__input_first')
    this._secondInput = this._popup.querySelector('.form__input_second')
  }

  _getInputValues() {
    if (this._firstInput) {
      return [this._firstInput.value, this._secondInput.value]
    }
  }

  open(data) {
    super.open()
    if (data) {
      inputName.value = data.name;
      inputSubtitle.value = data.subtitle;
    }
  }
  deleteCard(action) {
    this._submitFunction = action
  }


  close() {
    super.close()
    if (this._firstInput && this._secondInput) {
      this._firstInput.value = ''
      this._secondInput.value = ''
    }
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.querySelector('.save__button').addEventListener('click', (evt) => {
      evt.preventDefault();
      if (this._popup.querySelector('.popup-delete__container')) {
        this._submitFunction()
      } else {
        this._submitFunction(this._getInputValues());
      }
    })
  }


}

