import React from "react";
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project section section_screen_wide" id="about-project"> 
      <h2 className="section__header about-project__header">О проекте</h2>
      <ul className="table">
        <li className="table__column">
          <div className="table__cell">
            <h3 className="table__heading">Дипломный проект включал 5 этапов</h3>
            <p className="table__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
        </li>
        <li className="table__column">
          <div className="table__cell">
            <h3 className="table__heading">На выполнение диплома ушло 5 недель</h3>
            <p className="table__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p></div>
        </li>
      </ul>
      <div>
        <ul className="chart">
          <li className="chart__cell chart__cell_purpose_weeks chart__cell_color_green">1 неделя</li>
          <li className="chart__cell chart__cell_purpose_weeks chart__cell_color_grey">4 недели</li>
          <li className="chart__cell chart__cell_purpose_part">Back-end</li>
          <li className="chart__cell chart__cell_purpose_part">Front-end</li>
        </ul>
      </div>
    </section>
    )
}

export default AboutProject;