import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMoviesButton from '../AddMoviesButton/AddMoviesButton';
import './SavedMovies.css';

function SavedMovies ({ isLoading }) {
  return (
    <div className="saved-movies section section_size_narrow section_screen_narrow">
      <SearchForm></SearchForm>
      {isLoading ? <Preloader></Preloader> :
      <>
        <MoviesCardList></MoviesCardList>
      </>
      }
    </div>
  )
}

export default SavedMovies;