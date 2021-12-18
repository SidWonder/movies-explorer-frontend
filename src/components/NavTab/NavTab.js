import React from "react";
import './NavTab.css';

function NavTab() {
    return (
        <nav className="NavTab">
            <ul className="NavTab__list">
                <li className="NavTab__listItem"><a href="#AboutProject" className="NavTab__link">О проекте</a></li>
                <li className="NavTab__listItem"><a href="#Techs" className="NavTab__link">Технологии</a></li>
                <li className="NavTab__listItem"><a href="#AboutMe" className="NavTab__link">Студент</a></li>
            </ul>
        </nav>
    );
}

export default NavTab;