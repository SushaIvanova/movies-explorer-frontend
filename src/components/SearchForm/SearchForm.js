import React from "react";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm () {
  return (
    
      <form className="search-form" name="search">
        <div className="search-form__container">
          <input className="search-form__input" placeholder="Фильм"></input>
          <button className="search-form__button"></button>
        </div>
        <FilterCheckbox />
      </form>
    
  )
}

export default SearchForm;