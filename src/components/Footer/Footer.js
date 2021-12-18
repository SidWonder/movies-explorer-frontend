import React from "react";
import "./Footer.css";
import {Link} from "react-router-dom";

function Footer () {
    return (
        <footer className="Footer">
                <p className="Footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <ul className="Footer__list">
                    <li className="Footer__item">&copy; {new Date().getFullYear()}</li>
                    <li className="Footer__item"><Link to='https://practicum.yandex.ru/' className="Footer__link">Яндекс.Практикум</Link></li>
                    <li className="Footer__item"><Link to='https://github.com/SidWonder' className="Footer__link">Github</Link></li>
                    <li className="Footer__item"><Link to='https://www.facebook.com/o.mildz' className="Footer__link">Facebook</Link></li>
                </ul>
        </footer>
    );
}

export default Footer;
