import React from "react";
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm ({ onSubmit, onChange, value, checked, onCheckboxChange, isError }) {
  
  return (
      <form className="search-form" name="search" onSubmit={onSubmit}>
        <div className="search-form__container">
          <input 
            type="text"
            name="search"
            id="search"
            className="search-form__input" 
            placeholder="Фильм"
            value={value}
            onChange={onChange}
           />
          <button className="search-form__button" type="submit" />
        </div>
        {isError && <span className="profile__input-error">Нужно ввести ключевое слово</span>}
        <FilterCheckbox checked={checked} onChange={onCheckboxChange}/>
      </form>
    
  )
}

export default SearchForm;