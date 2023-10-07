import React from "react";
import './Techs.css';

function Techs() {
  return (
    <section className="tech section section_screen_wide" id="tech"> 
      <h2 className="section__header tech__header">Технологии</h2>
      <h3 className="tech__title">7 технологий</h3>
      <p className="tech__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="tech__list">
        <li className="tech__list-item">HTML</li>
        <li className="tech__list-item">CSS</li>
        <li className="tech__list-item">JS</li>
        <li className="tech__list-item">React</li>
        <li className="tech__list-item">Git</li>
        <li className="tech__list-item">Express.js</li>
        <li className="tech__list-item">mongoDB</li>
      </ul>
    </section>
    )
}

export default Techs;