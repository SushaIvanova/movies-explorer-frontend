import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className="footer section section_size_narrow section_screen_narrow"> 
      <p className="footer__heading">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__content">
        <p className="footer__copyright footer__content-item">© 2023</p>
        <nav className="footer__platforms">
          <Link to="https://practicum.yandex.ru/" className="footer__platforms-item footer__content-item" target="_blank" rel="noreferrer">Яндекс.Практикум</Link>
          <Link to="https://github.com/" className="footer__platforms-item footer__content-item" target="_blank" rel="noreferrer">Github</Link>
        </nav>
      </div>
    </div>
    )
}

export default Footer;