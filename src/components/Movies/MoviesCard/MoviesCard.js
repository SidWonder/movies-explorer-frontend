import React from "react";
import "./MoviesCard.css";

function MoviesCard({movieName , movieLength, movieCover, movieInFavorite}) {
    return (
        <div className="MoviesCard">
            <p className="MoviesCard__title">{movieName}</p>
            <p className="MoviesCard__length">{movieLength} минут</p>
            <img src={movieCover} alt={`Облошка фильма ${movieName}`} className="MoviesCard__image"/>
            {movieInFavorite ? <button className="MoviesCard__button MoviesCard__button_inFavorite"></button>
                : <button className="MoviesCard__button">Сохранить</button>}
        </div>)
}

export default MoviesCard;