import {React, useRef} from "react";
import './Navigation.css';
import {Link} from "react-router-dom";

function Navigation({pageType, mobile, loggedIn}) {
    const menuMobile = useRef(null);

    const menuViewHandle = () => {
        const menuViewSelector = 'Navigation__list_mobile-active';
        if (menuMobile.current.classList.contains(menuViewSelector)) {
            menuMobile.current.classList.remove('Navigation__list_mobile-active');
        } else {
            menuMobile.current.classList.add('Navigation__list_mobile-active');
        }
    }

    return (
        <nav className={`Navigation ${mobile ? 'Navigation__mobile' : 'Navigation__desktop'}`}>
            {pageType === 'main' &&
                <ul className="Navigation__list Navigation__list_main">
                    <li className="Navigation__listItem_main
                                   Navigation__listItem_registration">
                        {loggedIn ?
                                <Link to="/movies" className="Navigation__link Navigation__link_auth">Фильмы</Link>
                            :   <Link to="/signup" className="Navigation__link Navigation__link_auth">Регистрация</Link>}
                    </li>
                    <li className="Navigation__listItem_main
                                Navigation__listItem_login">
                        {loggedIn ?
                            <Link to="/saved-movies" className="Navigation__link Navigation__link_auth">Сохраненные фильмы</Link> :
                            <Link to="/signin" className="Navigation__link Navigation__link_auth Navigation__link_auth_active">Войти</Link>
                        }
                    </li>
            </ul>}

            {(pageType === 'allMovies'
                || pageType === 'savedMovies'
                || pageType === 'profile') && mobile && <>
                <button onClick={menuViewHandle} className="Navigation__button_menuToggle"></button>
                <ul ref={menuMobile} className={`Navigation__list Navigation__list_default Navigation__list_mobile`}>
                    <button onClick={menuViewHandle} className="Navigation__button_close"></button>
                    <li className="Navigation__listItem_default
                            Navigation__listItem_default-mobile">
                        <Link to="/" className="Navigation__link
         Navigation__link_movies">Главная</Link>
                    </li>
                    <li className="Navigation__listItem_default
                            Navigation__listItem_default-mobile">
                        <Link to="/movies" className="Navigation__link
         Navigation__link_movies">Фильмы</Link>
                    </li>
                    <li className="Navigation__listItem_default Navigation__listItem_default-mobile">
                        <Link to="/saved-movies" className="Navigation__link
          Navigation__link_savedMovies">Сохраненные фильмы</Link>
                    </li>
                    <li className="Navigation__listItem_default Navigation__listItem_default-mobile">
                        <Link to="/profile" className="Navigation__link
          Navigation__link_account">Аккаунт</Link>
                    </li>
                </ul>
            </>
            }

            {(pageType === 'allMovies'
                || pageType === 'savedMovies'
                || pageType === 'profile') && !mobile && <>
                <ul ref={menuMobile}
                    className={`Navigation__list
                                Navigation__list_default
                                Navigation__list_desktop`}
                >
                    <li className="Navigation__listItem_default
                                        Navigation__listItem_default-desktop"
                    >
                        <Link to="/movies" className="Navigation__link
                                                        Navigation__link_movies">Фильмы
                        </Link>
                    </li>
                        <li className="Navigation__listItem_default
                                            Navigation__listItem_default-desktop">
                            <Link to="/saved-movies" className="Navigation__link
                  Navigation__link_savedMovies">Сохраненные фильмы</Link>
                        </li>
                        <li className="Navigation__listItem_default
                                            Navigation__listItem_default-desktop">
                            <Link to="/profile" className="Navigation__link
                  Navigation__link_account">Аккаунт
                            </Link>
                        </li>
                </ul>
            </>
            }
        </nav>


    );
//
}

export default Navigation;
