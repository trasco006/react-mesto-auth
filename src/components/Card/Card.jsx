import React from 'react';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

class Card extends React.Component {
  static contextType = CurrentUserContext
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: props.selectedCard,
    }
    this.render = this.render.bind(this)
    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleLikeClick = this.handleLikeClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this )
  }

  handleLikeClick(){
    this.props.onCardLike(this.props.cardInfo)
  }

  handleDeleteClick(evt){
    this.props.onCardDelete(this.props.cardInfo)
  }

  handleCardClick() {
    this.props.onCardClick(
      this.props.cardInfo.link,
      this.props.cardInfo.name)
  }

  render() {
    const isOwn = this.props.cardInfo.owner._id === this.context._id;
    const isLiked = this.props.cardInfo.likes.some(i => i._id === this.context._id)
    if (this.props.cardInfo !== undefined) {
      return (
        <div className="card-template">
          <div className="card">
            <img src={this.props.cardInfo.link}
                 alt={this.props.cardInfo.name}
                 className="card__image"
                 onClick={this.handleCardClick}/>
            <button aria-label="Delete card"
                    onClick={this.handleDeleteClick}
                    className={isOwn ? 'card__trash-can' : ''}/>
            <div className="card__section">
              <h2 className="card__title">{this.props.cardInfo.name}</h2>
              <div className="card__like-container">
                <button aria-label="Like-button"
                        type="button"
                        onClick={this.handleLikeClick}
                        className={isLiked ? "card__like card_liked" : "card__like" }/>
                <p className="card__likes-number">{this.props.cardInfo.likes.length}</p>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <div/>
    }
  }
}

export default Card