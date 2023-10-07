import React from "react";
import logo from '../../images/logo.svg';
import blueIcon from '../../images/profile-blue.svg';
import blackIcon from '../../images/profile-black.svg';
import './Header.css';
import { NavLink, useLocation } from 'react-router-dom';


function Header({ loggedIn, isMobileScreen, onOpenMenu }) {

  const location = useLocation();

  const headerClass = location.pathname === '/' ? 'header_theme_blue' : 'header_theme_black';

  return (
    <header className={`header section section_size_narrow ${headerClass}`}>
      <img className="header__logo" src={logo} alt="Логотип со смайликом" />
      {loggedIn === false ?  (
      <nav className="header__navigation header__navigation_state_logged-out">
        <NavLink to="/signup" className="header__link header__link_purpose_register" >Регистрация</NavLink>
        <button className="header__button"><NavLink to="/signin" className="header__link header__link_purpose_login">Войти</NavLink></button>
      </nav>
      ) : (
      <>
        {isMobileScreen ? (
          <button className="header__menu-button" onClick={onOpenMenu} />
        ) : (
        <nav className="header__navigation header__navigation_state_logged-in">
          <div className="header__links">
            <NavLink to='/movies' className={({isActive}) => `header__films-link header__link_state_logged-in header__link_purpose_films ${isActive ? "header__films-link_active" : ""}`}>Фильмы</NavLink>
            <NavLink to='/saved-movies' className={({isActive}) => `header__films-link header__link_state_logged-in header__link_purpose_films ${isActive ? "header__films-link_active" : ""}`}>Сохранённые фильмы</NavLink>
          </div>
          <NavLink to='/profile' className="header__link_purpose_account">
            <p className="header__link-title">Аккаунт</p>
            {location.pathname === '/' ? <img className="header__link-logo" src={blueIcon} alt="иконка профиля"></img> :
            <img className="header__link-logo" src={blackIcon} alt="Иконка профиля"></img>
            }
          </NavLink>
        </nav>
        )}
      </>
    )}
    </header>
  )
}

export default Header;