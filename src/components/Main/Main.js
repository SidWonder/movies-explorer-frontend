import React from 'react';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from "../AboutProject/AboutProject";
import NavTab from "../NavTab/NavTab";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Header from "../Header/Header";

function Main({loggedIn}) {
    return (
        <section className='Main'>
            <Header pageType={'main'} loggedIn={loggedIn}/>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
    </section>)
}

export default Main;
