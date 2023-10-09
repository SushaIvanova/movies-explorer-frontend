import React from "react";
import './InfoTooltip.css';

function InfoTooltip({ errorType }) {
  const authErrorMessage = "Вы ввели неправильный логин или пароль.";
  const noTokenErrorMessage = "При авторизации произошла ошибка. Токен не передан или передан не в том формате.";
  const wrongTokenErrorMessage = "При авторизации произошла ошибка. Переданный токен некорректен.";
  const conflictErrorMessage = "Пользователь с таким email уже существует.";
  const registerErrorMessage = "При регистрации пользователя произошла ошибка.";
  const editErrorMessage = "При обновлении профиля произошла ошибка.";
  const serverErrorMessage = "500 На сервере произошла ошибка.";
  const routeErrorMessage = "404 Страница по указанному маршруту не найдена.";

  return (
    <span className="form__tooltip-text" id="text">
      {
      errorType === 'auth' ? authErrorMessage :
      errorType === 'noToken' ? noTokenErrorMessage :
      errorType === 'wrongToken' ? wrongTokenErrorMessage :
      errorType === 'conflict' ? conflictErrorMessage :
      errorType === 'register' ? registerErrorMessage :
      errorType === 'edit' ? editErrorMessage :
      errorType === 'route' ? routeErrorMessage :
      errorType === 'server' ? serverErrorMessage :
      ''
      }
    </span>    
  )
}

export default InfoTooltip;