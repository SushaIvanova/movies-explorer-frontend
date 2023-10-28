import React from "react";
import './AddMoviesButton.css';

function AddMoviesButton({onClick}) {
  return (
    <button className="add-button" type="button" onClick={onClick}>Ещё</button>
  )
}

export default AddMoviesButton;