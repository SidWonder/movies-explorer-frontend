import React from "react";
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="AboutProject">
            <h3 className="AboutProject__title">О проекте</h3>
            <div className="AboutProject__stages-wrapper">
                <div className="AboutProject__stage">
                    <p className="AboutProject__stageText">Дипломный проект включал 5 этапов</p>
                    <p className="AboutProject__stageSubtext">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="AboutProject__stage">
                    <p className="AboutProject__stageText">На выполнение диплома ушло 5 недель</p>
                    <p className="AboutProject__stageSubtext">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
                <div className="AboutProject__progress-bar">
                    <span className="AboutProject__progress-bar-item">1 неделя</span>
                    <span className="AboutProject__progress-bar-item">4 недели</span>
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

export default AboutProject;
