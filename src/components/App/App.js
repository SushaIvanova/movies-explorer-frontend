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
import { CurrentUserContext } from "../../context/CurrentUserContexts";
import {useNavigate} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import SavedMovies from "../SavedMovies/SavedMovies";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { mainApi } from "../../utils/MainApi";
import { useFormWithValidation } from '../../hooks/useForm';
import { Navigate } from "react-router-dom";


function App() {

  const location = useLocation();
  const navigate = useNavigate();

  // const[loggedIn, setLoggedIn] = React.useState(false);
  const[savedCards, setSavedCards] = React.useState([]); //сохраненные фильмы
  const[isLoading, setIsLoading] = React.useState(false);
  const[isMenuOpen, setIsMenuOpen] = React.useState(false);
  const[currentUser, setCurrentUser] = React.useState({});
  const[isSuccess, setIsSuccess] = React.useState(false);
  const[isEditing, setIsEditing] = React.useState(false);
  const[isSending, setIsSending] = React.useState(false);

  const isMobileScreen = useMediaQuery({ maxWidth: 768 });

  const[errorType, setErrorType] = React.useState(''); //будет устанавливаться при отлавливании ошибок

  const[isError, setIsError] = React.useState(false);

  const initialLoggedIn = !!localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = React.useState(initialLoggedIn);

  useEffect(() => {
    handleTokenCheck();
    console.log(loggedIn);
  }, []);

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token){
      mainApi.getContent(token)
      .then((res) => {
        setLoggedIn(true);
        // navigate('/', {replace: true});
      })
      .catch(err => {
        console.log(err);
      })
    } 
  }

  React.useEffect(() => {
    if(loggedIn) {
      const token = localStorage.getItem('token');
      Promise.all([mainApi.getUserInfo(token), mainApi.getSavedMovies(token)])
        .then(([userInfo, movies]) => {
          setCurrentUser(userInfo);
          setSavedCards(movies);
        })
        .catch((error) => console.log(`Ошибка ${error}`));
      }
  }, [loggedIn]);

  function handleCardDelete(card) {
    console.log(card);
    const token = localStorage.getItem('token');
    mainApi.deleteCard(card._id, token)
    .then(() => {
      setSavedCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((error => console.log(error)))
  }

  function handleSaveCard(data) {
    console.log(data);
    const isSaved = savedCards.some(item => item.movieId === data.id)
    const token = localStorage.getItem('token');
    if(isSaved) {
      const cardToDelete = savedCards.find((card) => card.movieId === data.id)
      handleCardDelete(cardToDelete);
    } else {
      mainApi.saveCard(data, token)
      .then((newCard) => {
        setSavedCards([newCard, ...savedCards])
        console.log(newCard);
      })
      .catch((error) => console.log(error))
    }  
  }

  const { formValue, handleChange, resetForm, errorMessage, isValid, isEmailValid } = useFormWithValidation();

  function handleRegister() {
    const {name, email, password} = formValue;
    mainApi.register(name, password, email)
    .then((res) => {
      handleLogin();
    })
    .catch(error => {
      setIsError(true);
      console.log(error);
      if (error === 409) {
        setErrorType('conflict');
      } else {
        setErrorType('register')
      }      
    }); 
  }

  const handleLogin = () => {
setIsSending(true);
    const {password, email} = formValue;
    mainApi.authorize(password, email)
    .then((res) => {
      localStorage.setItem('token', res.token);
      setLoggedIn(true);
      console.log(loggedIn);
      navigate('/movies', {replace: true}); 
      setIsSending(false);
    })
    .catch(err => {
      setIsError(true);
      console.log(err);
      if (err === 400) {
        setErrorType('auth');
      } else {
        setErrorType('noToken')
      } 
      setIsSending(false);
    }); 
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setIsError(false);
  };

  const handleEditProfile = (data) => {
    setIsSending(true);
    const token = localStorage.getItem('token');
    mainApi.editProfile(data, token)
    .then((user) => {
      setCurrentUser(user);
      setIsSuccess(true);
      setIsEditing(false);
      setIsSending(false);
    })
    .catch((error) => {
      setIsSending(false);
      setIsError(true);
      console.log(error);
      if (error === 409) {
        setErrorType('conflict');
      } else if (error === 500) {
        setErrorType('server');
      } else {
        setErrorType('edit');
      }
    })
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    localStorage.clear();
    navigate('/', {replace: true});
  }

  const handleOpenMenuClick = () => {
    setIsMenuOpen(true);
  }

  const handleCloseMenuClick = () => {
    setIsMenuOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className='page__container'>
          {['/', '/movies', '/saved-movies', '/profile'].includes(location.pathname) ? <Header loggedIn={loggedIn} isMobileScreen={isMobileScreen} onOpenMenu={handleOpenMenuClick} ></Header> : null}
          <Routes>
            <Route path="/" 
              element={<Main loggedIn={loggedIn} />}
            />
            <Route path="*" 
              element={<NotFoundPage />}
            />
            <Route path="/signin"
              element={<Login
              errorType={errorType}
              onLogin={handleLogin}
              onChange={handleChange} 
              formValue={formValue} 
              errorMessage={errorMessage} 
              isValid={isValid} 
              isError={isError}
              setIsError={setIsError}
              isSending={isSending}
              />}>
            </Route>
            <Route path="/signup" 
              element={<Register 
              errorType={errorType} 
              onRegister={handleRegister} 
              onChange={handleChange} 
              formValue={formValue} 
              errorMessage={errorMessage} 
              isValid={isValid} 
              isError={isError}
              setIsError={setIsError}
              isEmailValid={isEmailValid}
              isSending={isSending}
              />}>
            </Route>
            <Route path="/profile" element={
            <ProtectedRoute
              element={Profile}
              onEditProfile={handleEditProfile}
              onSignOut={handleSignOut}
              errorType={errorType}
              isError={isError}
              isSuccess={isSuccess}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              onEditClick={handleEditClick}
              loggedIn={loggedIn}
              setIsError={setIsError}
              isSending={isSending}
              />}
            />
            <Route path="/movies" element={
            <ProtectedRoute
              element={Movies}
              isError={isError}
              onSave={handleSaveCard}
              loggedIn={loggedIn}
              isLoading={isLoading}
              setIsError={setIsError}
              savedCards={savedCards}
              setIsSending={setIsSending}
            />}
            />
            <Route path="/saved-movies" element={
            <ProtectedRoute
              element={SavedMovies}
              savedCards={savedCards}
              onDelete={handleCardDelete}
              isError={isError}
              loggedIn={loggedIn}
              isSending={isSending}
              />}
            />
          </Routes>
          {['/', '/movies', '/saved-movies'].includes(location.pathname) ? <Footer></Footer> : null}
          <Menu
            isOpen={isMenuOpen} 
            onClose={handleCloseMenuClick} 
          />
          
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
