import React from "react";
import "./SavedMovies.css";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";

function SavedMovies() {
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
        <MoviesCardList cards={cards} pageType={'favorites'}/>
    )
}

export default SavedMovies