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
                  className="Navigation__link Navigation__link_logo">
            </Link>
            <Navigation pageType={pageType} mobile={view}/>
            {/*<button onClick={toggleMenu} className="Header__button"></button>*/}
        </header>
    )
}

export default Header;
