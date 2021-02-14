import React from 'react';
import './Footer.css'

class Footer extends React.Component {
  render() {
    let year = new Date().getFullYear()
    return (
      <footer className="footer">
        <p className="footer__copyright">© {year} Mesto Russia </p>
      </footer>
    )
  }
}

export default Footer
