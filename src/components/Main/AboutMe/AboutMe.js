import React from "react";

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
          <ul className="AboutMe__contacts-list">
              <li className="AboutMe__contacts-item"><a className="AboutMe__link_contact" href="#">Facebook</a></li>
              <li className="AboutMe__contacts-item"><a className="AboutMe__link_contact" href="#">Github</a></li>
          </ul>
      </div>

        <h4 className="AboutMe__subtitle">Портфолио</h4>
        <ul className="AboutMe__portfolio-list">
            <li className="AboutMe__portfolio-item"><a className="AboutMe__link_portfolio" href="#">Статичный сайт</a></li>
            <li className="AboutMe__portfolio-item"><a className="AboutMe__link_portfolio" href="#">Адаптивный сайт</a></li>
            <li className="AboutMe__portfolio-item"><a className="AboutMe__link_portfolio" href="#">Одностраничное приложение</a></li>
        </ul>
    </section>
  );
}

export default AboutMe;
