import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import {Link} from "react-router-dom";
import {PAGE_TYPES} from "../../utils/Constants";

function Header({pageType, loggedIn}) {
    const {LOGIN, REGISTER} = PAGE_TYPES;
    const [view,setView] = React.useState(null);

    function isMobile () {
        const bodyWidth = document.body.getBoundingClientRect().width;
        setView(bodyWidth >=320 && bodyWidth <=1023 ? true : false);
    }


    React.useEffect(()=>{
        isMobile();
        window.addEventListener('resize', isMobile)
    }, []);

    return (
        <header className={`Header Header__${pageType}`} >
            <Link to="/"
                  className="Header__link_logo">
            </Link>
            {pageType === REGISTER && <h2 className='Header__title'>Добро пожаловать!</h2>}
            {pageType === LOGIN && <h2 className='Header__title'>Рады видеть!</h2>}
            <Navigation pageType={pageType} mobile={view} loggedIn={loggedIn}/>
        </header>
    )
}

export default Header;
