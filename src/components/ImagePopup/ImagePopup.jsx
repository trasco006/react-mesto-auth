import React from 'react';

class ImagePopup extends React.Component {
  constructor(props) {
    super(props);
    this.render = this.render.bind(this)
  }

  render() {
    return (
      this.props.selectedCard ? (
        <div className={`popup-image popup_opened`}>
          <div className="popup-image__overlay popup-overlay"/>
          <div className="popup-image__container">
            <div>
              <img src={this.props.srcImg} alt={this.props.title} className="popup-image__item"/>
              <p className="popup-image__title">{this.props.title}</p>
              <button aria-label="Close"
                      className="popup-image__escape-button popup_close_button"
                      onClick={this.props.closeAllPopups}/>
            </div>
          </div>
        </div>
      ) : null)
  }
}

export default ImagePopup