import React from "react";
import "./AboutMe.css";
import Portfolio from "../Portfolio/Portfolio";
import {Link} from "react-router-dom";

function AboutMe() {
  return (
    <section id="AboutMe" className="AboutMe">
      <h3 className="AboutMe__title">Студент</h3>
      <div className="AboutMe__text-wrapper">
        <p className="AboutMe__name">Олег</p>
        <p className="AboutMe__profession">Фронтенд-разработчик, 27 лет</p>
        <p className="AboutMe__bio">
          Я родился в 94 ом на краю города
          Фронтенд поздно ударил в голову в 25 активно верстал неправильно
          В Практикуме девочки впервые показали мне ООП .
        </p>
          <img src="https://sun9-23.userapi.com/impg/wSiudxrs3U0RZGY0Yha-ztwmQiKZXUjpTdBOtA/L0eA0KILgNc.jpg?size=848x1280&quality=95&sign=ae2d8d8af705969c777ffabfacd304b0&type=album" alt="Фото красавца" className="AboutMe__photo"/>
          <ul className="AboutMe__contacts-list">
              <li className="AboutMe__contacts-item"><Link className="AboutMe__link_contact" to='https://www.facebook.com/o.mildz'>Facebook</Link></li>
              <li className="AboutMe__contacts-item"><Link className="AboutMe__link_contact" to='https://github.com/SidWonder'>Github</Link></li>
          </ul>
      </div>

        <Portfolio />
    </section>
  );
}

export default AboutMe;
