import React from 'react';
import Card from "../Card/Card"
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

class Main extends React.Component {
  static contextType = CurrentUserContext

  constructor(props) {
    super(props);
    this.render = this.render.bind(this)
  }


  render() {
    return (
      <main>
        <section className="profile">
          <div className="profile__column">
            <div className="profile__avatar-container">
              <div className="profile__avatar"
                   style={{backgroundImage: `url(${this.context.avatar})`}}/>
              <div className="profile__avatar-edit"
                   onClick={this.props.openEditAvatarPopup}
              >
                <div className="profile__avatar-edit-ico"
                />
              </div>
            </div>
            <div className="profile__info">
              <div className="profile__info-column">
                <p className="profile__user-name">{this.context.name}</p>
                <button aria-label="Edit profile"
                        type="button"
                        className="profile__edit-button"
                        onClick={this.props.openEditProfilePopup}/>
              </div>
              <p className="profile__subtitle">{this.context.about}</p>
            </div>
          </div>
          <button aria-label="Add new card"
                  type="button"
                  className="profile__add-button"
                  onClick={this.props.openAddPlacePopup}/>
        </section>
        <section className="elements">
          {this.props.cards.map((item) => {
              return (
                <Card key={item._id}
                      cardInfo={item}
                      onCardClick={this.props.onCardClick}
                      onCardLike={this.props.onCardLike}
                      onCardDelete={this.props.onCardDelete}
                />
              )
            }
          )}
        </section>
      </main>)
  }
}

export default Main