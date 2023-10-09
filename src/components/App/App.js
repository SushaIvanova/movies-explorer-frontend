import React, { useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import Header from '../Header/Header';
import Main from "../Main/Main";
import Footer from '../Footer/Footer';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Menu from "../Menu/Menu";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
// import { api } from "../utils/api";
// import { CurrentUserContext } from "../context/CurrentUserContexts";
// import * as auth from '../utils/auth.js';
// import {useNavigate} from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
import './App.css';
import SavedMovies from "../SavedMovies/SavedMovies";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function App() {

  const location = useLocation();

  const[loggedIn, setLoggedIn] = React.useState(false);
  const[cards, setCards] = React.useState([]);
  const[isLoading, setIsLoading] = React.useState(false);
  const[isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isMobileScreen = useMediaQuery({ maxWidth: 768 });

  const [errorType, setErrorType] = React.useState('noToken'); //будет устанавливаться при отлавливании ошибок


  // const [formValue, setFormValue] = React.useState({
  //   name: '',
  //   email: '',
  //   password: ''
  // })

  // const handleChange = (e) => {
  //   const {name, value} = e.target;

  //   setFormValue({
  //     ...formValue,
  //     [name]: value
  //   });
  // }

  // function handleRegister() {
  //   const {name, email, password} = formValue;
  //   // auth.register(password, email)
  //   // .then((res) => {
  //   //   setIsInfoTooltipPopupOpen(true);
  //   //   setIsSignUpSuccess(true);
  //   //   navigate('/sign-in', {replace: true});
  //   // })
  //   // .catch(err => {
  //   //   setIsInfoTooltipPopupOpen(true);
  //   //   setIsSignUpSuccess(false);
  //   //   console.log(err);
  //   // }); 
  // }

  const handleEditProfile = () => {

  }

  const handleOpenMenuClick = () => {
    setIsMenuOpen(true);
  }

  const handleCloseMenuClick = () => {
    setIsMenuOpen(false);
  }

  function handleCardLike(card) {

  }

  return (
    <div className="App">
      <div className='page__container'>
        {['/', '/movies', '/saved-movies', '/profile'].includes(location.pathname) ? <Header loggedIn={loggedIn} isMobileScreen={isMobileScreen} onOpenMenu={handleOpenMenuClick} ></Header> : null}
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} cards={cards} />}></Route>
          <Route path="/signin" element={<Login errorType={errorType}/>}></Route>
          <Route path="/signup" element={<Register errorType={errorType}/>}></Route>
          <Route path="/profile" element={<Profile onEditProfile={handleEditProfile} errorType={errorType}/>}></Route>
          <Route path="/movies" element={<Movies loggedIn={loggedIn} isLoading={isLoading} onCardLike={handleCardLike}/>}></Route>
          <Route path="/saved-movies" element={<SavedMovies loggedIn={loggedIn} />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
        {['/', '/movies', '/saved-movies'].includes(location.pathname) ? <Footer></Footer> : null}
        <Menu
          isOpen={isMenuOpen} 
          onClose={handleCloseMenuClick} 
        ></Menu>
        
      </div>
    </div>
  );
}

export default App;
