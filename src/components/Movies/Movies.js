import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import AddMoviesButton from '../AddMoviesButton/AddMoviesButton';
import './Movies.css';

function Movies ({ loggedIn, isLoading }) {
  return (
    <div className="movies section section_size_narrow section_screen_narrow">
      <SearchForm></SearchForm>
      {isLoading ? <Preloader></Preloader> :
      <>
        <MoviesCardList></MoviesCardList>
        <AddMoviesButton></AddMoviesButton>
      </>
      }
    </div>
  )
}

export default Movies;