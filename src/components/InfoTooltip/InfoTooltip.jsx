import React from 'react'

export default class InfoTooltip extends React.Component {


  render() {
    return (
      <div className="info-tooltip-popup">
        <div onClick={this.props.onClose} className="info-tooltip-popup__overlay popup-overlay"/>
        <div className="info-tooltip-popup__container">
          <div className={`info-tooltip-popup__image ${this.props.regStatus === true ? `info-tooltip-popup__image_type_ok` : `info-tooltip-popup__image_type_no`}`}/>
          <p className="info-tooltip-popup__title">{this.props.regStatus === true ? `Вы успешно зарегистрировались!` : `Что-то пошло не так! Попробуйте ещё раз.`}</p>
          <button aria-label="Close"
                  className="info-tooltip-popup__escape-button"
                  onClick={this.props.onClose}/>
        </div>
      </div>
    )
  }

}