import React from "react";
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard ({ card, onCardLike, onCardDelete }) {

  const location = useLocation();
  
  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <img className="card__video" alt="Заставка видео" src={card.link} />
      <div className="card__caption-container">
        <h2 className="card__caption-text" >{card.name}</h2>
          {location.pathname === '/movies' ? 
          <button type="button" className="card__button card__like-button" /*className={cardLikeButtonClassName}*/ aria-label="Мне нравится" onClick={handleLikeClick}></button> :
          <button type="button" className="card__button card__delete-button" aria-label="Удалить" onClick={handleDeleteClick}></button>
          }
      </div>
      <p className="card__video-length">1ч 47м</p>
    </div>
  )
}

export default MoviesCard;