import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import {Link} from "react-router-dom";

function Header({pageType}) {

    const [menu, setMenu] = React.useState(false);
    const [view,setView] = React.useState(isMobile());

    function isMobile () {
        const bodyWidth = document.body.getBoundingClientRect().width;

        return  bodyWidth >=320 && bodyWidth <=1023 ? true : false

    }

    function toggleMenu() {
        setMenu(!menu)
    }

    return (
        <header className={`Header Header__${pageType}`} >
            <Link to="/"
                  className="Header__link_logo">
            </Link>
            {pageType === 'register' && <h2 className='Header__title'>Добро пожаловать!</h2>}
            {pageType === 'login' && <h2 className='Header__title'>Рады видеть!</h2>}
            <Navigation pageType={pageType} mobile={view}/>
        </header>
    )
}

export default Header;
