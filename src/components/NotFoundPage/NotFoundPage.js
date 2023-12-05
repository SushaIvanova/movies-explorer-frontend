import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './NotFoundPage.css';

function NotFoundPage () {
  const navigate = useNavigate();

  return (
    <main className="not-found section">
      <h1 className="not-found__error-code">404</h1>
      <p className="not-found__error">Страница не найдена</p>
      <button className="not-found__link" onClick={() => navigate(-1)}>Назад</button>
    </main>
  )
}

export default NotFoundPage;