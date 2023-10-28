import React from "react";
import Form from "../Form/Form";
import './Login.css';

function Login({ errorType, onLogin, onChange, formValue, errorMessage, isValid, isError, setIsError }) {

  const handleInputChange = (e) => {
    onChange(e);
    setIsError(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formValue);
  }

  return (
   <main className="login section">
    <Form 
      formName="login" 
      name='login' 
      title="Рады видеть!" 
      question="Ещё не зарегистрированы?" 
      link="/signup" 
      linkName="Регистрация" 
      buttonText="Войти" 
      isDisabled={!isValid} 
      isValid={isValid} 
      errorType={errorType} 
      onSubmit={handleSubmit} 
      isError={isError}
    >
      <div className="form__inputs-list form__inputs-list_place_login">
        <label className="form__label">E-mail</label>
          <input 
            className={`form__input form__input_type_email ${!isValid && errorMessage.email ? 'form__input_type_error' : ''}`}  
            type="email" 
            name="email"
            id='email'
            value={formValue.email || ''} 
            required
            onChange={handleInputChange}
            placeholder="Введите email"
          />
          <span className="form__error form__error_place_login form__error_purpose_email">{errorMessage.email || ''}</span>
        <label className="form__label">Пароль</label>
          <input 
            className={`form__input form__input_type_password ${!isValid && errorMessage.password ? 'form__input_type_error' : ''}`}  
            type="password" 
            name="password" 
            id='password'
            value={formValue.password || ''} 
            minLength="8"
            required
            onChange={handleInputChange}
            placeholder="Введите пароль"
          />
          <span className="form__error form__error_place_login form__error_purpose_password">{errorMessage.password || ''}</span>
      </div>
    </Form>
   </main>
  )
}

export default Login;