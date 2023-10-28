import React from "react";
import './InfoTooltip.css';

const errorMessages = {
  auth: "Вы ввели неправильный логин или пароль.",
  noToken: "При авторизации произошла ошибка. Токен не передан или передан не в том формате.",
  wrongToken: "При авторизации произошла ошибка. Переданный токен некорректен.",
  conflict: "Пользователь с таким email уже существует.",
  register: "При регистрации пользователя произошла ошибка.",
  edit: "При обновлении профиля произошла ошибка.",
  server: "500 На сервере произошла ошибка.",
  route: "404 Страница по указанному маршруту не найдена."
};

function InfoTooltip({ errorType }) {
  const errorMessage = errorMessages[errorType] || "";
  return (
    <span className="form__tooltip-text" id="text">{errorMessage}</span>    
  )
}

export default InfoTooltip;