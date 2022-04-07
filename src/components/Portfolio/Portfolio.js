import React from "react";
import "./Portfolio.css";

function Portfolio() {
    return (
      <div className="Portfolio">
          <h4 className="Portfolio__title">Портфолио</h4>
          <ul className="Portfolio__list">
              <li className="Portfolio__item">
                  <a className="Portfolio__link" rel='noreferrer' target='_blank' href="https://sidwonder.github.io/how-to-learn/ ">Статичный сайт</a></li>
              <li className="Portfolio__item">
                  <a className="Portfolio__link" rel='noreferrer' target='_blank' href="https://sidwonder.github.io/russian-travel/">Адаптивный сайт</a></li>
              <li className="Portfolio__item">
                  <a className="Portfolio__link" rel='noreferrer' target='_blank' href="https://sidwonder.github.io/mesto/">Одностраничное приложение</a></li>
          </ul>
      </div>
    );
}

export default Portfolio;
