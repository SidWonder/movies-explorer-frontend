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
                <div className="AboutProject__progressBar">
                    <span className="AboutProject__progressBarItem AboutProject__progressBarItem_backend"><p className="AboutProject__progressBarText">1 неделя</p></span>
                    <span className="AboutProject__progressBarItem AboutProject__progressBarItem_frontend"><p className="AboutProject__progressBarText">4 недели</p></span>
                </div>
        </section>
    );
}

export default AboutProject;
