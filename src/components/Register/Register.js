import React, {useState} from "react";
import Form from "../Form/Form";
import { useFormWithValidation } from '../../hooks/useForm';
import './Register.css';

function Register({ errorType, onRegister }) {

  const { formValue, handleChange, resetForm, errorMessage, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(formValue);
  }

  return (
   <div className="register section">
    <Form formName="register" name='login' title="Добро пожаловать!" question="Уже зарегистрированы?" link="/signin" linkName="Войти" buttonText="Зарегистрироваться" isDisabled={!isValid} isValid={isValid} errorType={errorType} >
      <div className="form__inputs-list form__inputs-list_place_register">
      <label className="form__label">Имя</label>
      <input 
        className={`form__input form__input_type_name ${!isValid && errorMessage.name ? 'form__input_type_error' : ''}`} 
        type="text"
        name="name" 
        id='name'
        value={formValue.name || ''} 
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
      />
      <span className="form__error form__error_place_register form__error_purpose_name">{errorMessage.name || ''}</span>
      <label className="form__label">E-mail</label>
      <input 
        className={`form__input form__input_type_email ${!isValid && errorMessage.email ? 'form__input_type_error' : ''}`} 
        type="email" 
        name="email"
        id='email'
        value={formValue.email || ''} 
        required
        onChange={handleChange}
      />
      <span className="form__error form__error_place_register form__error_purpose_email">{errorMessage.email || ''}</span>
      <label className="form__label">Пароль</label>
      <input 
        className={`form__input form__input_type_password ${!isValid && errorMessage.password ? 'form__input_type_error' : ''}`} 
        type="password" 
        name="password" 
        id='password'
        value={formValue.password || ''} 
        minLength="8"
        required
        onChange={handleChange}
      />
      <span className="form__error form__error_place_register form__error_purpose_password">{errorMessage.password || ''}</span>
      </div>
    </Form>
   </div>
  )
}

export default Register;