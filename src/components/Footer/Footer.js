import React from "react";
import "./Footer.css";

function Footer () {
    return (
        <footer className="Footer">
                <p className="Footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                <ul className="Footer__list">
                    <li className="Footer__item">&copy; {new Date().getFullYear()}</li>
                    <li className="Footer__item"><a href="#" className="Footer__link">Яндекс.Практикум</a></li>
                    <li className="Footer__item"><a href="#" className="Footer__link">Github</a></li>
                    <li className="Footer__item"><a href="#" className="Footer__link">Facebook</a></li>
                </ul>
        </footer>
    );
}

export default Footer;
