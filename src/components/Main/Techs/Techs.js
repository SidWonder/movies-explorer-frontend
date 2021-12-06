import React from "react";

function Techs() {
    return (
        <section className="Techs">
            <h3 className="Techs__header">Технологии</h3>
            <p className="Techs__title">7 технологии</p>
            <p className="Techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="Techs__list">
                <li className="Techs__listItem">HTML</li>
                <li className="Techs__listItem">CSS</li>
                <li className="Techs__listItem">JS</li>
                <li className="Techs__listItem">React</li>
                <li className="Techs__listItem">Git</li>
                <li className="Techs__listItem">Express.js</li>
                <li className="Techs__listItem">mongoDB</li>
            </ul>


        </section>
    );
}

export default Techs;