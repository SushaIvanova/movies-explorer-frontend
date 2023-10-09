import React from "react";
import { NavLink } from "react-router-dom";
import blackIcon from '../../images/profile-black.svg';
import './Menu.css';

function Menu({ isOpen, onClose }) {
  return (
    <nav className={`menu ${isOpen ? 'menu_opened' : ''}`}>
      <button className="menu__button" onClick={onClose} />
      <div className="menu__container">
        <ul className="menu__links">
          <li className="menu__links-item">
            <NavLink to="/" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`} >Главная</NavLink>
          </li>
          <li className="menu__links-item">
            <NavLink to='/movies' className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Фильмы</NavLink>
          </li>
          <li className="menu__links-item">
            <NavLink to='/saved-movies' className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`} >Сохранённые фильмы</NavLink>
          </li>
        </ul>
        <NavLink to='/profile' className="menu__account-link" >
          <p className="menu__link-title">Аккаунт</p>
          <div className="menu__link-logo"  alt="Иконка профиля"></div>
        </NavLink>
      </div>
     
    </nav>
  )
}

export default Menu;