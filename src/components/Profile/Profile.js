import React from "react";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { useFormWithValidation } from '../../hooks/useForm';
import './Profile.css';
// import { Link } from "react-router-dom";
// import { Link, useLocation} from 'react-router-dom';

function Profile({ name, email, onEditProfile, onSignOut, errorType }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newName, setNewName] = React.useState(name);
  const [newEmail, setNewEmail] = React.useState(email);
  const [editError, setEditError] = React.useState(false);

  const { formValue, handleChange, resetForm, errorMessage, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile(formValue);
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  // const handleNameChange = (e) => {
  //   setNewName(e.target.value);
  // }

  // const handleEmailChange = (e) => {
  //   setNewEmail(e.target.value);
  // }

  

  return (
    <main className="profile section">
      {/* <FormTitle  */}
      {/* <h2 className="profile__title"title={`Привет, ${name}!`} /> */}
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__info" name="profile">
        <div className="profile__info-line">
          <p className="profile__input-title">Имя</p>
          {isEditing ? (
            <input className="profile__input profile__input_purpose_name"
              type="text"
              value={newName}
              onChange={handleChange}
              placeholder="Введите имя"
            />
          ) : (
          // <p className="profile__caption profile__caption_purpose_name">{name}</p>
          <p className="profile__caption profile__caption_purpose_name">Виталий</p>

          )}
          </div>
        <div className="profile__info-line">
          <p className="profile__input-title">E-mail</p>
          {isEditing ? (
            <input className="profile__input profile__input_purpose_email"
              type="email"
              value={newEmail}
              onChange={handleChange}
              placeholder="Введите email"
            />
          ) : (
          <p className="profile__caption profile__caption_purpose_email">pochta@yandex.ru</p>
          // <p className="profile__caption profile__caption_purpose_email">{email}</p>
          )}
          </div>
          {isEditing ? (
        <>
        <InfoTooltip
          errorType={errorType}
        />
        <button onClick={handleSaveClick} className='profile__save-button' disabled={!isValid}>
          Сохранить
        </button>
        </>
      ) : (
      <>
        <button onClick={handleEditClick} className="profile__edit-button">Редактировать</button>
        <button onClick={onSignOut} className="profile__sign-out-button">Выйти из аккаунта</button>
      </>
      
      )}
      </form>
    
      
    </main>
  )
}

export default Profile;