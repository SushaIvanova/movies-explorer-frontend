import React from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { CurrentUserContext } from "../../context/CurrentUserContexts";
import { useFormWithValidation } from "../../hooks/useForm";
import './Profile.css';

function Profile({ onEditProfile, onSignOut, errorType, isError, isSuccess, isEditing, setIsEditing, onEditClick, loggedIn, setIsError }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const {handleChange, formValue, errorMessage, isValid, resetForm} = useFormWithValidation();

  const isDataChanged = formValue.name !== currentUser.name || formValue.email !== currentUser.email;

  const handleInputChange = (e) => {
    handleChange(e);
    setIsError(false);
  }

  React.useEffect(() => {
    resetForm({
      name: currentUser.name,
      email: currentUser.email
    });
    setIsError(false);
  }, [resetForm, currentUser, isEditing, setIsError])

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile({
      name: formValue.name,
      email: formValue.email,
    });
  }

  console.log(currentUser);
  

  return (
    <main className="profile section" >
      <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
      <form className="profile__info" name="profile" onSubmit={handleSubmit}>
        <div className="profile__info-line">
        <div className="profile__input-group">
          <p className="profile__input-title">Имя</p>
          
          {isEditing ? (
            <input className="profile__input profile__input_purpose_name"
              type="text"
              name="name"
              id='name'
              value={formValue.name || ''}
              onChange={handleInputChange}
              placeholder="Введите имя"
              minLength='2'
              maxLength='20'
              required
            />
          ) : (
          <p className="profile__caption profile__caption_purpose_name">{currentUser.name}</p>
          )}
          </div>
          <span className="profile__input-error">{errorMessage.name || ''}</span>
          </div> 
        <div className="profile__info-line">
        <div className="profile__input-group">
          <p className="profile__input-title">E-mail</p>
          {isEditing ? (
            <input className="profile__input profile__input_purpose_email"
              type="email"
              name="email"
              id='email'
              value={formValue.email || ''}
              onChange={handleInputChange}
              placeholder="Введите email"
              required
            />
          ) : (
          <p className="profile__caption profile__caption_purpose_email">{currentUser.email}</p>
          )}
          </div>
          <span className="profile__input-error">{errorMessage.email || ''}</span>
          </div>
          {isEditing ? (
        <>
        {isError && <InfoTooltip
          errorType={isError ? errorType : ''}
        />}
        
        <button className='profile__save-button' disabled={!isValid || isError || !isDataChanged}>
          Сохранить
        </button>
        </>
      ) : (
      <>
        {!isError && isSuccess && <p className="profile__success-tooltip">Профиль успешно обновлен!</p>}
        <button onClick={onEditClick} className="profile__edit-button">Редактировать</button>
        <button onClick={onSignOut} className="profile__sign-out-button">Выйти из аккаунта</button>
      </>
      
      )}
      </form>
    
      
    </main>
  )
}

export default Profile;