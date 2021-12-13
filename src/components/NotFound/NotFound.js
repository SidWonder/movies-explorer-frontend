import React from "react";
import "./NotFound.css";
import {Link} from "react-router-dom";

function NotFound() {
return (
    <section className="NotFound">
        <h1 className='NotFound__number'>404</h1>
        <p className="NotFound__text">Страница не найдена</p>
        <Link className="NotFound__link" to='/'>Назад</Link>
    </section>
);
}

export default NotFound;