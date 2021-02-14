///////////////////////////////////////////// ДОБАВЛЕНИЕ ПОПАПА ИЗМЕНЕНИЯ ДАННЫХ ПРОФИЛЯ
export const editButton = document.querySelector('.profile__edit-button');
export const formEditProfile = document.querySelector('.popup__container')
export const popup = document.querySelector('.popup');

// ОБЪЯВЛЕНИЕ КНОПОК ПОПАПА
export const escapeButton = document.querySelector('.popup__escape-button');

// ОБЪЯВЛЕНИЕ ДАННЫХ ПРОФИЛЯ
export const profileName = document.querySelector('.profile__user-name');
export const profileSubtitle = document.querySelector('.profile__subtitle');

// ОБЪЯВЛЕНИЕ ПОЛЕЙ ВООДА ПОПАПА
export const inputName = document.querySelector('#input-name');
export const inputSubtitle = document.querySelector('#input-subtitle');

///////////////////////////////////////////// ДОБАВЛЕНИЕ ПОПАП-КАРТОЧКИ

// ОБЪЯВЛЕНИЕ ПОПАПА-КАРТОЧКИ И КНОПКИ ДОБАВЛЕНИЯ КАРТОЧКИ
export const popupCard = document.querySelector('.popup-card');
export const addCardButton = document.querySelector('.profile__add-button');
export const formAddCard = document.querySelector('.popup-card__container')
export const popupImage = document.querySelector('.popup-image')
export const popupImageItem = document.querySelector('.popup-image__item')
// ОБЪЯВЛЕНИЕ КНОПОК ПОПАПА-КАРТОЧКИ
export const escapeCardButton = document.querySelector('.popup-card__escape-button');

// ОБЪЯВЛЕНИЕ ПОЛЕЙ ВВОДА ПОПАПА-КАРТОЧКИ
export const inputCardName = document.querySelector('#input-card-name');
export const inputCardSrc = document.querySelector('#input-url');

////// ЛОГИКА ДОБАВЛЕНИЯ КАРТОЧКИ
export const elementsContainer = document.querySelector('.elements');

// МАССИВ ШЕСТИ КАРТОЧЕК
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const settings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//Кнопка вызова попапа изменения аватара
export const avatarEditButton = document.querySelector('.profile__avatar-edit')
