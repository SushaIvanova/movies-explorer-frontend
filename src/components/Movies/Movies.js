import React, { useCallback } from "react";
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { moviesApi } from "../../utils/MoviesApi";
import AddMoviesButton from '../AddMoviesButton/AddMoviesButton';
import { useScreen } from "../../hooks/useScreen";

import './Movies.css';

function Movies ({ isError, onSave, loggedIn, setIsError, savedCards }) {

  const [searchQuery, setSearchQuery] =  React.useState(""); 
  const [filteredCards, setFilteredCards] = React.useState([]); 
  const [cards, setCards] = React.useState([]); 
  const [isShortMovie, setIsShortMovie] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInputError, setIsInputError] = React.useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = React.useState(0);
  const [isSending, setIsSending] = React.useState(false);

  const { isDesktop, isTablet, isMobile, desktopAdd, tabletOrMobileAdd } = useScreen();

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

  //добавление карточек по кнопке
  function handleRowAdd() {
    if(isDesktop) {
      setVisibleCardsCount(visibleCardsCount => visibleCardsCount + desktopAdd);
    }
    if(isMobile || isTablet) {
      setVisibleCardsCount(visibleCardsCount => visibleCardsCount + tabletOrMobileAdd);
    }
  }

  //ввод в строку поиска
  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  //фильтрация карточек
  const filterMovies = useCallback(() => {
    const query = searchQuery.toLowerCase();
    let filteredMovies = cards.filter((movie) => {
      const movieTitleRU = movie.nameRU.toLowerCase();
      const movieTitleEN = movie.nameEN.toLowerCase();
      return movieTitleRU.includes(query) || movieTitleEN.includes(query);
    });
    
    if(isShortMovie) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
    }

    setFilteredCards(filteredMovies);
    
    console.log(filteredCards);
    
  }, [searchQuery, cards, isShortMovie]);

  //поиск по фильмам
  const handleMoviesSearch = () => {
    setIsSending(true);
    setIsLoading(true);
    moviesApi.getMovies()
    .then((cards) => {
      console.log(cards);
      setCards(cards);
      filterMovies(searchQuery, isShortMovie, cards);
      localStorage.setItem('search', JSON.stringify(searchQuery));
      localStorage.setItem('isShort', JSON.stringify(isShortMovie));
      localStorage.setItem('movies', JSON.stringify(cards));
      setIsSending(false);
    })
    .catch((error) => {
      setIsError(true);
      console.log(error)
      setIsSending(false);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  React.useEffect(() => {
    filterMovies();
  }, [filterMovies]);

  React.useEffect(() => {
    if(localStorage.search && localStorage.isShort && localStorage.movies) {
      console.log(localStorage);
      const search = JSON.parse(localStorage.search);
      setSearchQuery(search);
      const isShort = JSON.parse(localStorage.isShort);
      setIsShortMovie(isShort);
      const movies = JSON.parse(localStorage.movies);
      setCards(movies);
    }
  }, [])
  
  //функция сабмита
  function handleSubmit(e) {
    e.preventDefault();
    if(searchQuery === '') {
      setIsInputError(true);
    } else {
    handleMoviesSearch(filteredCards);
    setIsInputError(false);
    }
  }

  //переключение 
  function handleShortMoviesChange() {
    setIsShortMovie(!isShortMovie);
    localStorage.setItem('isShort', JSON.stringify(!isShortMovie));
    filterMovies(); 
  }
  
  return (
    <section className="movies section section_size_narrow section_screen_narrow">
      <SearchForm 
        onSubmit={handleSubmit} 
        onChange={handleSearchChange} 
        value={searchQuery} 
        checked={isShortMovie} 
        onCheckboxChange={handleShortMoviesChange}
        isError={isInputError}
        isSending={isSending}
         />
      {isLoading ? 
       <Preloader /> :
      isError ?
        <p className="movies__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> :
      filteredCards.length > 0 ?
      <>
        <MoviesCardList 
          cards={filteredCards} 
          visibleCardsCount={visibleCardsCount} 
          savedCards={savedCards} 
          onSave={onSave}
        />
        {visibleCardsCount < filteredCards.length && <AddMoviesButton onClick={handleRowAdd} />}
      </> :
        <p className="movies__error">Ничего не найдено</p>
      }
    </section>
  )
}

export default Movies;