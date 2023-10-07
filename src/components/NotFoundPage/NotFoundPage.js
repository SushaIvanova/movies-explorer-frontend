import React from "react";
import { Link } from "react-router-dom";
import './NotFoundPage.css';

function NotFoundPage () {
  return (
    <section className="not-found section">
      <h2 className="not-found__error-code">404</h2>
      <p className="not-found__error">Страница не найдена</p>
      <Link to="/" className="not-found__link">Назад</Link>
    </section>
  )
}

export default NotFoundPage;