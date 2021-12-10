import React from "react";
import "./Portfolio.css";

function Portfolio() {
    return (
      <div className="Portfolio">
          <h4 className="Portfolio__title">Портфолио</h4>
          <ul className="Portfolio__list">
              <li className="Portfolio__item">
                  <a className="Portfolio__link" href="#">Статичный сайт</a></li>
              <li className="Portfolio__item">
                  <a className="Portfolio__link" href="#">Адаптивный сайт</a></li>
              <li className="Portfolio__item">
                  <a className="Portfolio__link" href="#">Одностраничное приложение</a></li>
          </ul>
      </div>
    );
}

export default Portfolio;
