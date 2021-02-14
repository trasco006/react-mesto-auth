import {
  profileName,
  inputName,
  profileSubtitle,
  addCardButton,
  inputSubtitle,
  elementsContainer,
  editButton,
  popup,
  popupImage,
  popupCard,
  inputCardName,
  settings,
  inputCardSrc,
  avatarEditButton
} from "../scripts/utils/constants.js"
import Card from "../scripts/components/Card.js"
import Api from "../utils/api.js"
import CardDeletePopup from "../scripts/components/CardDeletePopup";
import Section from "../scripts/components/Section.js"
import PopupWithImage from "../scripts/components/PopuWithImage";
import {PopupWithForm} from "../scripts/components/PopuWithForm.js"
import {FormValidator} from "../scripts/components/FormValidator.js"
import './index.css'

import UserInfo from "../scripts/components/UserInfo";
/****************************************************************************/
// СОЗДАНИЕ ЭКЗЕМПЛЯРА Api //
/****************************************************************************/

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-17/",
  headers: {
    authorization: 'cef396cb-7f39-49a2-a008-1d3b290a4906',
    'Content-Type': 'application/json'
  }
})
/****************************************************************************/
// ЛОГИКА РАБОТЫ ПОПАПА ИЗМЕНЕНИЯ АВАТАРА //

/****************************************************************************/
const popupAvatar = new PopupWithForm('.popup-avatar', (item) => {
  api.setUserAvatar(item[0]).then(() => {
      popupAvatar.close()
      userInfo.setUserAvatar(item[0])
    }
  )
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
})

avatarEditButton.addEventListener('click', () => {
  popupAvatar.open();
})
//привязка полей ввода попапа
inputName.value = profileName.textContent;

inputSubtitle.value = profileSubtitle.textContent;
//Функционал создания превью карточки
const popupWithImageElement = new PopupWithImage('.popup-image');

const handleCardClick = (src, title) => {
  popupWithImageElement.open(src, title)
}

const popupWithDelete = new PopupWithForm('.popup-delete')
const acceptDeleteFunction = (data) => {
  popupWithDelete.open()
  popupWithDelete.deleteCard(
    () => {
      document.querySelector('.popup-delete__save-button').textContent = 'Удаление...'
      api.deleteCardById(data.server)
        .then(() => {
          data.client()
          popupWithDelete.close()
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          document.querySelector('.popup-delete__save-button').textContent = 'Да'
        })
    }
  )
}

popupWithDelete.setEventListeners()

//Функция создания новой карточки
function getCardElement(nameItem, linkItem, selectorItem, handleCardClick, acceptDeleteFunction, data, user) {
  const card = new Card(nameItem, linkItem, selectorItem, handleCardClick, acceptDeleteFunction, data, user);
  return card.generateCard();
}

const section = new Section({}, '.elements')

Promise.all(
  [
    api.getUserInfo(),
    api.getAllCards()
  ]
).then((res) => {
  userInfo.setUserInfo(res[0].name, res[0].about, res[0].avatar)
  res[1].forEach(function (data) {
    section.addItem(getCardElement(data.name, data.link, '.card-template', handleCardClick, acceptDeleteFunction, data, res[0]._id))
  })
})
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

const popupWithCard = new PopupWithForm('.popup-card', (data) => {
  document.querySelector('.popup-card__save-button').textContent = 'Сохранение...'

  api.addNewCard(inputCardName.value, inputCardSrc.value).then((res) => {
    section.addItem(getCardElement(res.name, res.link, '.card-template', handleCardClick, acceptDeleteFunction, res, ''))
    popupWithCard.close()
  })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      document.querySelector('.popup-card__save-button').textContent = 'Сохранить'
    })
})
addCardButton.addEventListener('click', () => popupWithCard.open());
popupWithCard.setEventListeners()

// ЗАКРЫТИЕ ПОПАПА ПРИ НАЖАТИИ НА ОВЕРЛЭЙ
popupCard.querySelector('.popup-card__overlay').addEventListener('click', () => popupWithCard.close());
popupImage.querySelector('.popup-image__overlay').addEventListener('click', () => popupWithImageElement.close());
popup.querySelector('.popup__overlay').addEventListener('click', () => popupUserInfo.close())

//Включение валидации форм
const validateProfilePopup = new FormValidator(settings, '.popup__container')
validateProfilePopup.enableValidation()
const validateCardPopup = new FormValidator(settings, '.popup-card__container')
validateCardPopup.enableValidation()
const validateAvatarPopup = new FormValidator(settings, '.popup-avatar__container')
validateAvatarPopup.enableValidation()

/**********************************************************************************************/
// Попап изменения информации пользователя
/**********************************************************************************************/
const userInfoObj = {
  name: '.profile__user-name',
  subtitle: '.profile__subtitle',
  url: '.profile__avatar'
}
const userInfo = new UserInfo(userInfoObj)
const popupUserInfo = new PopupWithForm('.popup', () => {
  document.querySelector('.popup__save-button').textContent = 'Сохранение...'
  api.setUserInfo(inputName.value, inputSubtitle.value).then((res) => {
    userInfo.setUserInfo(res.name, res.about, res.avatar);
    popupUserInfo.close()
  })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      document.querySelector('.popup__save-button').textContent = 'Сохранить'
    })
})
editButton.addEventListener('click', () => popupUserInfo.open(userInfo.getUserInfo()));

// Вызов обработчиков
popupWithImageElement.setEventListeners()
popupUserInfo.setEventListeners()
popupAvatar.setEventListeners()