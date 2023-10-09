import React from "react";
import { Link } from "react-router-dom";
import './NotFoundPage.css';

function NotFoundPage () {
  return (
    <main className="not-found section">
      <h1 className="not-found__error-code">404</h1>
      <p className="not-found__error">Страница не найдена</p>
      <Link to="/" className="not-found__link">Назад</Link>
    </main>
  )
}

export default NotFoundPage;