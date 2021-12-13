import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({pageType}) {
    return (
        <header className="Header" >
            {/*{pageType === 'login' && <h1>Рады видеть!</h1>}*/}
            {/*{pageType === 'register' && <h1>Добро пожаловать!</h1>}*/}
                    <Navigation pageType={pageType}/>
        </header>
    )
}

export default Header;
