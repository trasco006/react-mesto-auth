import '../App.css';
import React from "react";
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import ImagePopup from "./ImagePopup/ImagePopup";
import api from "./../utils/api"
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup/EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup/AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Register from "./Register/Register";
import Login from "./Login/Login"
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import auth from "../utils/authentication";

class App extends React.Component {
  static contextType = CurrentUserContext

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: ''
      },
      loggedIn: false,
      regStatus: false,
      isInfoTooltipPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      name: '',
      title: '',
      children: '',
      isOpen: false,
      onClose: true,
      selectedCard: false,
      currentUser: {},
      cards: []
    }
    this.handleEditProfileClick = this.handleEditProfileClick.bind(this)
    this.handleEditAvatarClick = this.handleEditAvatarClick.bind(this)
    this.handleAddPlaceClick = this.handleAddPlaceClick.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)
    this.closeAllPopups = this.closeAllPopups.bind(this)
    this.render = this.render.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleUpdateUser = this.handleUpdateUser.bind(this)
    this.handleUpdateAvatar = this.handleUpdateAvatar.bind(this)
    this.handleAddCard = this.handleAddCard.bind(this)
    this.handleCardDelete = this.handleCardDelete.bind(this)
    this.handleCardLike = this.handleCardLike.bind(this)
    this.handleRegNewUser = this.handleRegNewUser.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleTokenCheck = this.handleTokenCheck.bind(this)
  }

  componentDidMount() {

    // получение данных пользователя с сервера
    api.getUserInfo().then((res) => {
      this.setState({
        currentUser: res
      })
    })
      .catch((err) => {
        console.log(err);
      });
    // получение списка карточек с сервера
    api.getAllCards().then((res) => {
      this.setState({
        cards: res
      })
    })
      .catch((err) => {
        console.log(err);
      });
    this.handleTokenCheck()
  }

// обновление данных пользователя
  handleUpdateUser(obj) {
    api.setUserInfo(obj).then((res) => {
      this.setState({
        currentUser: res
      })
      this.closeAllPopups()
    })
      .catch((err) => {
        console.log(err);
      });
  }

// обновление аватара пользователя
  handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar).then((res) => {
      this.setState({
        currentUser: res
      })
      this.closeAllPopups()
    })
      .catch((err) => {
        console.log(err);
      });
  }

// добавление новой карточки
  handleAddCard(obj) {
    api.addNewCard(obj).then((res) => {
      this.setState({
        cards: [res, ...this.state.cards]
      })
      this.closeAllPopups()
    })
      .catch((err) => {
        console.log(err);
      });
  }

// закрытие всех попапов
  closeAllPopups() {
    this.setState({
      isOpen: false,
      selectedCard: false,
      onClose: true,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isInfoTooltipPopupOpen: false
    })
  }

//открытие попапа редактирования профиля
  handleEditProfileClick(evt) {
    this.setState({
      onClose: !this.state.onClose,
      isOpen: !this.state.isOpen,
      name: 'profile',
      title: 'Редактировать профиль',
      isEditProfilePopupOpen: true
    })
  }

// открытие попапа измеения аватара
  handleEditAvatarClick(evt) {
    this.setState({
      onClose: !this.state.onClose,
      isOpen: !this.state.isOpen,
      name: 'avatar',
      title: 'Обновить аватар',
      isEditAvatarPopupOpen: true
    })
  }

// открытие попапа добавления карточки
  handleAddPlaceClick(evt) {
    this.setState({
      onClose: !this.state.onClose,
      name: 'place',
      isOpen: !this.state.isOpen,
      title: 'Новое место',
      isAddPlacePopupOpen: true
    })

  }

// открытие попапа превью карточки
  handleCardClick(src, name) {
    this.setState({
      selectedCard: true,
      onClose: false,
      cardLink: src,
      cardTitle: name
    })
  }

// лайк карточки
  handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((res) => {
      const newCards = this.state.cards.map((item) => item._id === card._id ? res : item);
      this.setState({
        cards: newCards
      })
    });
  }

// удаление карточки
  handleCardDelete(card) {
    api.deleteCardById(card._id).then((res) => {
      const newCards = this.state.cards.filter((item) => item._id !== card._id ? item : null);
      this.setState({
        cards: newCards
      })
    })
  }

// Регистрация нового пользователя
  handleRegNewUser(data) {
    auth.signUp(data)
      .then(() => {
        this.setState({
          isInfoTooltipPopupOpen: true,
          regStatus: true
        })
      })
      .catch(() => {
          this.setState({
            isInfoTooltipPopupOpen: true,
            regStatus: false
          })
        }
      )
  }

// Вход в аккаунт
  handleLogin(data) {
    auth.signIn(data)
      .then((data) => {
          this.setState({
            loggedIn: true
          })
          localStorage.setItem('jwt', data.token);
        }
      )
      .catch(() => {
          this.setState({loggedIn: false})
        }
      )
  }

// Выход из аккаунта
  handleLogout() {
    localStorage.removeItem('jwt')
    this.setState({
      loggedIn: false
    })
  }

// Проверка токена на валидность
  handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        this.setState({
          loggedIn: true,
          userInfo: {
            email: res.data.email
          }
        })
      })
    }
  }


  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className="App">
          <div className="page">
            {/*попап подтверждения регистрации*/}
            {this.state.isInfoTooltipPopupOpen === true ? <InfoTooltip onClose={this.closeAllPopups}
                                                                       regStatus={this.state.regStatus}/> : null}
            <Header logOut={this.handleLogout} userEmail={this.state.userInfo.email} loggedIn={this.state.loggedIn}/>
            <Switch>

              <Route path="/sign-up">
                {this.state.loggedIn === true ? <Redirect to="./"/> :
                  <Register regNewUser={this.handleRegNewUser}/>}
              </Route>
              <Route path="/sign-in">
                {this.state.loggedIn === true ? <Redirect to="./"/> :
                  <Login loginUser={this.handleLogin}/>}
              </Route>
              <ProtectedRoute path="/"
                              loggedIn={this.state.loggedIn}
                              component={Main}
                              openAddPlacePopup={this.handleAddPlaceClick}
                              openEditProfilePopup={this.handleEditProfileClick}
                              openEditAvatarPopup={this.handleEditAvatarClick}
                              onCardClick={this.handleCardClick}
                              closeAllPopups={this.closeAllPopups}
                              cards={this.state.cards}
                              onCardLike={this.handleCardLike}
                              onCardDelete={this.handleCardDelete}/>
            </Switch>
            {this.state.loggedIn === true ? <Footer/> : null}
          </div>
          {/*попап изменения профиля*/}
          {this.state.isEditProfilePopupOpen === true ?
            <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen}
                              onUpdateUser={this.handleUpdateUser}
                              onClose={this.closeAllPopups}/> : null}
          {/*попап изменения аватара*/}
          {this.state.isEditAvatarPopupOpen === true ?
            <EditAvatarPopup isOpen={this.state.isEditAvatarPopupOpen}
                             onUpdateAvatar={this.handleUpdateAvatar}
                             onClose={this.closeAllPopups}/> : null}
          {/*попап добавления карточки*/}
          {this.state.isAddPlacePopupOpen === true ?
            <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen}
                           onAddPlace={this.handleAddCard}
                           onClose={this.closeAllPopups}/> : null}
          <ImagePopup srcImg={this.state.cardLink}
                      title={this.state.cardTitle}
                      closeAllPopups={this.closeAllPopups}
                      selectedCard={this.state.selectedCard}/>
        </div>
      </CurrentUserContext.Provider>)
  }
}

export default App
