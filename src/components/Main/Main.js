import React from 'react';
import AboutMe from './AboutMe/AboutMe';
import AboutProject from "./AboutProject/AboutProject";
import NavTab from "./NavTab/NavTab";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";

function Main() {
    return (
        <section className='Main'>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
    </section>)
}

export default Main;
