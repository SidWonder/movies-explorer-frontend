import React from "react";
import "./Portfolio.css";
import {Link} from "react-router-dom";

function Portfolio() {
    return (
      <div className="Portfolio">
          <h4 className="Portfolio__title">Портфолио</h4>
          <ul className="Portfolio__list">
              <li className="Portfolio__item">
                  <Link className="Portfolio__link" to="#">Статичный сайт</Link></li>
              <li className="Portfolio__item">
                  <Link className="Portfolio__link" to="#">Адаптивный сайт</Link></li>
              <li className="Portfolio__item">
                  <Link className="Portfolio__link" to="#">Одностраничное приложение</Link></li>
          </ul>
      </div>
    );
}

export default Portfolio;
