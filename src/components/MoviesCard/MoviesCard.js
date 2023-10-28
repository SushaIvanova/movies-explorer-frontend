import React from "react";
import './MoviesCard.css';
import { Link, useLocation } from 'react-router-dom';

function MoviesCard ({ card, onSave, onCardDelete, savedCards }) {

  const location = useLocation();
  
  // сохранение карточки
  const handleSaveClick = () => {
    onSave(card);
  }

  // удаление карточки
  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  // ф-я изменения формата длительности фильма
  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
  
    return `${hours}ч${minutes}м`;
  }

  const isSaved = savedCards.some(item => item.movieId === card.id);

  const cardLikeButtonClassName = ( 
    `card__button card__like-button ${isSaved && 'card__like-button_active'}` 
  );

  return (
    <div className="card">
      <Link 
        className='card__link' 
        to={card.trailerLink} 
        target="_blank" 
        rel="noreferrer">
          <img 
            className="card__video" 
            alt="Заставка видео" 
            src={location.pathname === '/movies' ? `https://api.nomoreparties.co${card.image.url}` : card.image} />
      </Link>
      <div className="card__caption-container">
        <h2 className="card__caption-text" >{card.nameRU}</h2>
          {location.pathname === '/movies' ? 
          <button type="button" className={cardLikeButtonClassName} aria-label="Мне нравится" onClick={handleSaveClick}></button> :
          <button type="button" className="card__button card__delete-button" aria-label="Удалить" onClick={handleDeleteClick}></button>
          }
      </div>
      <p className="card__video-length">{formatDuration(card.duration)}</p>
    </div>
  )
}

export default MoviesCard;