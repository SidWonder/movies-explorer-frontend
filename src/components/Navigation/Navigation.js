import React from "react";
import './Navigation.css';
import {Link} from "react-router-dom";

function Navigation({pageType}){
    return(
    <nav className={`Navigation Navigation__${pageType}`}>

        {pageType === 'main' && <ul className="Navigation__list">

            <li className="Navigation__listItem">
                <Link to="/"
                      className="Navigation__link Navigation__link_logo">
                </Link>
            </li>
            <li className="Navigation__listItem Navigation__listItem__registration">
                <Link to="/signup" className="Navigation__link
                                     Navigation__link_auth">Регистрация</Link>
            </li>
            <li className="Navigation__listItem">
                <Link to="/signin" className="Navigation__link
                                      Navigation__link_auth
                                      Navigation__link_auth_active">Войти</Link>
            </li>
        </ul>}
        {(pageType === 'movies'
            || pageType === 'savedMovies'
            || pageType === 'profile')
            && <ul className="Navigation__list">

            <li className="Navigation__listItem">
                <Link to="/" className="Navigation__link Navigation__link_logo">
                </Link>
            </li>
            <li className="Navigation__listItem">
                <Link to="/movies"  className="Navigation__link
                                     Navigation__link_movies">Фильмы</Link>
            </li>
            <li className="Navigation__listItem">
                <Link to="/saved-movies"  className="Navigation__link
                                      Navigation__link_savedMovies">Сохраненные фильмы</Link>
            </li>
            <li className="Navigation__listItem">
                <Link to="/profile"  className="Navigation__link
                                      Navigation__link_account">Аккаунт</Link>
            </li>
        </ul>}
        {
            (pageType === 'login' ||  pageType === 'register')  && <ul className="Navigation__list">

                <li className="Navigation__listItem">
                    <Link to="/"  className="Navigation__link Navigation__link_logo">
                    </Link>
                </li>
            </ul>
        }
    </nav>
    );

}

export default Navigation;