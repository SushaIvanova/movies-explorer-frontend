import React from "react";
import './Footer.css';

function Footer() {
  return (
    <div className="footer section section_size_narrow section_screen_narrow"> 
      <p className="footer__heading">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__content">
        <p className="footer__copyright footer__content-item">© 2022</p>
        <div className="footer__platforms">
          <p className="footer__platforms-item footer__content-item">Яндекс.Практикум</p>
          <p className="footer__platforms-item footer__content-item">Github</p>
        </div>
      </div>
    </div>
    )
}

export default Footer;