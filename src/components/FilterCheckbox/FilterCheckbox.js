import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox ({ checked, onChange }) {
  return (
    <div className="checkbox">
      <label className="switch">
      <input className="switch__input" type="checkbox" checked={checked} onChange={onChange} required={false} />
      <span className="switch__slider"></span>
      Короткометражки
    </label>
    </div>
  )
}

export default FilterCheckbox;