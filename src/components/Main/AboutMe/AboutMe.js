import React from "react";
import "./AboutMe.css";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="AboutMe">
      <h3 className="AboutMe__title">Студент</h3>
      <div className="AboutMe__text-wrapper">
        <p className="AboutMe__name">Олег</p>
        <p className="AboutMe__profession">Фронтенд-разработчик, 27 лет</p>
        <p className="AboutMe__bio">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
          есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься
          фриланс-заказами и ушёл с постоянной работы.
        </p>
          <img src="" alt="" className="AboutMe__photo"/>
          <ul className="AboutMe__contacts-list">
              <li className="AboutMe__contacts-item"><a className="AboutMe__link_contact" href="#">Facebook</a></li>
              <li className="AboutMe__contacts-item"><a className="AboutMe__link_contact" href="#">Github</a></li>
          </ul>
      </div>

        <Portfolio />
    </section>
  );
}

export default AboutMe;
