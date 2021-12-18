import React from "react";
import './Movies.css';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";

function Movies() {

    const [cards, setCards] = React.useState([
        {
            movieName:"В погоне за Бенкси",
            movieLength:"27",
            movieInFavorite:true,
            movieCover:"https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png"
        },
        {
            movieName:"В погоне за Бенкси",
            movieLength:"27",
            movieInFavorite:false,
            movieCover:"https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png"
        },
        {
            movieName:"В погоне за Бенкси",
            movieLength:"27",
            movieInFavorite:false,
            movieCover:"https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png"
        },
        {
            movieName:"В погоне за Бенкси",
            movieLength:"27",
            movieInFavorite:false,
            movieCover:"https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png"
        },
        {
            movieName:"В погоне за Бенкси",
            movieLength:"27",
            movieInFavorite:true,
            movieCover:"https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png"
        },
        {
            movieName:"В погоне за Бенкси",
            movieLength:"27",
            movieInFavorite:true,
            movieCover:"https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png"
        },    {
            movieName:"В погоне за Бенкси",
            movieLength:"27",
            movieInFavorite:true,
            movieCover:"https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png"
        },





    ]);

    return (
        <section className="Movies">
            <Header pageType={'movies'}/>
            <SearchForm />
            <MoviesCardList cards={cards} pageType={'allMovies'} />
        </section>
    );
}

export default Movies;