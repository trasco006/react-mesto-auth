export default class Card {
  constructor(title, imageLink, cardSelector, handleCardClick, acceptDeleteFunction, data, user) {
    this._title = title;
    this._imageLink = imageLink;
    this._cardSelector = cardSelector;
    this._popupImage = document.querySelector('.popup-image');
    this._popupImageItem = document.querySelector('.popup-image__item')
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector('.card__image');
    this._closePopupByEsc = this._closePopupByEsc.bind(this);
    this._acceptDeleteFunction = acceptDeleteFunction;
    this._owner = data.owner
    this._cardId = data._id
    this._user = user
    this._data = data
    this._likes = data.likes
    this._user = user
  }

  _closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
      this._closeCardImagePopup()
    }
  }

  _setLikesNumber() {
    this._element.querySelector('.card__likes-number').textContent = this._data.likes.length;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true);
  }

  _likeCard(evt) {
    if (evt.target.classList.contains('card_liked')) {

      api.disLikeCard(this._cardId).then((res) => {
        evt.target.classList.remove('card_liked')
        evt.target.parentElement.querySelector('.card__likes-number').textContent = res.likes.length
      })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      api.likeCard(this._cardId).then((res) => {
        evt.target.classList.add('card_liked')
        evt.target.parentElement.querySelector('.card__likes-number').textContent = res.likes.length
      })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  _removeCard(evt) {
    evt.target.parentElement.remove()
  }

  _openCardImagePopup() {
    this._popupImage.classList.add('popup_opened');
    window.addEventListener('keydown', this._closePopupByEsc)
  }

  _closeCardImagePopup() {
    this._popupImage.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._closePopupByEsc)
  }

  _previewCard() {
    this._openCardImagePopup()
    this._popupImageItem.src = this._imageLink;
    this._popupImageItem.alt = this._title;
    this._popupImage.querySelector('.popup-image__title').textContent = this._title;

  }

  _getCardId() {
    return this._cardId
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      this._likeCard(evt)
    });
    this._element.querySelector('.card__trash-can').addEventListener('click', (evt) => {
        const aar = {
          server: this._cardId
        }
        aar.client = () => {
          this._removeCard(evt)
        }
        this._acceptDeleteFunction(aar)
        // console.log(evt.target.parentElement)
      }
    );
    this._element.querySelector('.card__image').addEventListener('click', () => {
        this._handleCardClick(this._imageLink, this._title)
      }
      // this._previewCard()
    );

    this._popupImage.querySelector('.popup-image__escape-button').addEventListener('click', () => this._closeCardImagePopup())
  }

  // deleteCard(api, data) {
  //   api.deleteCardById(data.server).then(() => {
  //     data.client.remove()
  //   })
  //     .catch((err) => {
  //       console.log(err); // выведем ошибку в консоль
  //     })
  // }

  generateCard() {
    if (this._data.likes) {
      this._setLikesNumber()
      this._data.likes.forEach((item) => {
        if (item._id === this._user) {
          this._element.querySelector('.card__like').classList.add('card_liked')
        }
      })
    }
    this._setEventListeners();
    this._cardImg.src = this._imageLink;
    this._cardImg.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;
    if (this._user) {
      if (this._user !== this._owner._id) {
        this._element.querySelector('.card__trash-can').remove()
      }
    }
    return this._element;
  }
}

