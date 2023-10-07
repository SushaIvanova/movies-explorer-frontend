import React from "react";
import './Promo.css';
import square from '../../images/landing-logo.svg';

function Promo() {
  return (
    <section className="promo section section_place_promo section_screen_narrow"> 
      <img className="promo__image" src={square} alt="Квадрат с буквой П внутри"/>
      <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
    </section>
    )
}

export default Promo;