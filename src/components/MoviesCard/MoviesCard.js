import React from "react";
import "./MoviesCard.css";

import {PAGE_TYPES} from "../../utils/Constants";

function MoviesCard({movieName , movieLength, movieCover, movieInFavorite, pageType, addMovieToFav, movieId, removeMovieFromFav}) {

    const {ALL_MOVIES, SAVED_MOVIES} = PAGE_TYPES;

    function handleToggleFav(){

        if(movieInFavorite){
            console.log('try to remove', pageType);
            return removeMovieFromFav(movieId, pageType);
        } else {
            addMovieToFav(movieId);
        }

    }

    return (
        <div className="MoviesCard">
            <p className="MoviesCard__title">{movieName}</p>
            <p className="MoviesCard__length">{movieLength} минут</p>
            <img src={movieCover} alt={`Облошка фильма ${movieName}`} className="MoviesCard__image"/>
            {pageType === ALL_MOVIES && <button onClick={handleToggleFav} className={`MoviesCard__button ${movieInFavorite && 'MoviesCard__button_inFavoriteMovieList'}`}>{!movieInFavorite && 'Сохранить'}</button>}
            {pageType === SAVED_MOVIES && <button onClick={handleToggleFav} className='MoviesCard__button MoviesCard__button_inFavoriteList'></button>}
        </div>)
}

export default MoviesCard;