import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import { useLocation } from "react-router-dom";

function MoviesCardList({ cards, visibleCardsCount, savedCards, onSave, onDelete }) {
  const location = useLocation();
  
  return (
    <section className="card-list">
      <ul className="card-list__table">
        {location.pathname === '/movies' ? (
          cards.slice(0, visibleCardsCount).map((card) => (
            <MoviesCard 
              key={card.id}
              card={card} 
              onSave={onSave} 
              savedCards={savedCards} 
            />
          ))
        ) : (
          savedCards.slice(0, visibleCardsCount).map((card) => (
            <MoviesCard 
              key={card._id} 
              card={card} 
              onCardDelete={onDelete}
              savedCards={savedCards}
            />
          ))
        )}
      </ul>
    </section>
  )
}

export default MoviesCardList;