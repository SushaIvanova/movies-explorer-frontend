import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { initialCards } from "../../utils/constants";
import './MoviesCardList.css';

function MoviesCardList() {
  return (
    <section className="card-list">
      <ul className="card-list__table">
        {
          initialCards.map((card) => <MoviesCard key={card._id} card={card} />)
        }
      </ul>
    </section>
  )
}

export default MoviesCardList;