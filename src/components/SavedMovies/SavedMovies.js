import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { useMediaQuery } from 'react-responsive';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import AddMoviesButton from "../AddMoviesButton/AddMoviesButton";
import './SavedMovies.css';

function SavedMovies ({ savedCards, onDelete, isError }) {
  const [searchQuery, setSearchQuery] =  React.useState(""); //состояние для хранения запроса пользователя
  const [filteredCards, setFilteredCards] = React.useState([]); //состояние для хранения результата фильтрации фильмов
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = React.useState(0);
  const isDesktop = useMediaQuery({ minWidth: 1149 });
  const isTablet = useMediaQuery({ minWidth: 629, maxWidth: 1148 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 628 });

  //отображение карточек

  const handleShowCards = () => {
    if (isDesktop) {
      setVisibleCardsCount(12);
    } else if ( isTablet) {
      setVisibleCardsCount(8);
    } else if (isMobile) {
      setVisibleCardsCount(5);
    }
  }

  React.useEffect(() => {
    handleShowCards();
  }, [isDesktop, isTablet, isMobile])

  let timer = setTimeout(handleShowCards, 30000);

  const handleResize = () => {
    clearTimeout(timer);
    timer = setTimeout(handleShowCards, 30000);;
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //ввод в строку поиска
  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  //фильтрация карточек
  const filterMovies = React.useCallback(() => {
    const query = searchQuery.toLowerCase();
    let filteredMovies = savedCards.filter((movie) => {
      const movieTitleRU = movie.nameRU.toLowerCase();
      const movieTitleEN = movie.nameEN.toLowerCase();
      return movieTitleRU.includes(query) || movieTitleEN.includes(query);
    });
    if(isShortMovie) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
    }
    setFilteredCards(filteredMovies);
    console.log('filter');
    
  }, [searchQuery, savedCards, isShortMovie]);

  //поиск по фильмам
  const handleMoviesSearch = () => {
    console.log('ok');
    filterMovies(filteredCards);
  }

  React.useEffect(() => {
    filterMovies();
  }, [filterMovies]);

  //функция сабмита
  function handleSubmit(e) {
    e.preventDefault();
    handleMoviesSearch();
  }

  //переключение 
  function handleShortMoviesChange() {
    setIsShortMovie(!isShortMovie);
    filterMovies(isShortMovie, searchQuery, savedCards); // После изменения состояния чекбокса перефильтровываем карточки
  }

  return (
    <div className="saved-movies section section_size_narrow section_screen_narrow">
      <SearchForm 
        onSubmit={handleSubmit} 
        onChange={handleSearchChange} 
        value={searchQuery} 
        checked={isShortMovie} 
        onCheckboxChange={handleShortMoviesChange}
      />
      {isLoading ?
        <Preloader /> :
      isError ?
        <p className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> :
      filteredCards.length > 0 ?
      <>
        <MoviesCardList 
          savedCards={filteredCards} 
          visibleCardsCount={visibleCardsCount} 
          onDelete={onDelete} 
        />
      </> :
        <p className="movies__error">Ничего не найдено</p>
      }
    </div>
  )
}

export default SavedMovies;