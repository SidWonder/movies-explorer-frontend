import React from "react";
import './Promo.css';

function Promo() {
    return(
        <section className="Promo">
            <header className="Promo__header">
                <ul className="Promo__list">
                    <li className="Promo__listItem">
                        <a href="#" className="Promo__link Promo__link_logo">
                        </a>
                    </li>
                    <li className="Promo__listItem">
                        <a href="" className="Promo__link
                                             Promo__link_auth">Регистрация</a>
                    </li>
                    <li className="Promo__listItem">
                        <a href="" className="Promo__link
                                              Promo__link_auth
                                              Promo__link_auth_active">Войти</a>
                    </li>
                </ul>
            </header>
            <p className="Promo__mainText">
                Учебный проект студента факультета Веб-разработки.
            </p>
        </section>
    )
}

export default Promo;