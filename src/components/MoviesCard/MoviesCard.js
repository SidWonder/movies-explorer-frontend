import React from "react";
import "./MoviesCard.css";

import {PAGE_TYPES} from "../../utils/Constants";

function MoviesCard({movieName , movieLength, movieCover, movieInFavorite, pageType, addMovieToFav, movieId, removeMovieFromFav, trailerLink}) {

    const {ALL_MOVIES, SAVED_MOVIES} = PAGE_TYPES;

    function handleToggleFav(){

        if(movieInFavorite){
            return removeMovieFromFav(movieId, pageType);
        } else {
            addMovieToFav(movieId);
        }

    }

    return (
        <div className="MoviesCard">

          <p className="MoviesCard__title">{movieName}</p>
            <p className="MoviesCard__length">{movieLength} минут</p>
            <a href={trailerLink} target='_blank' rel='noreferrer'>
            <img src={movieCover} alt={`Облошка фильма ${movieName}`} className="MoviesCard__image"/>
            </a>
            {pageType === ALL_MOVIES && <button onClick={handleToggleFav} className={`MoviesCard__button ${movieInFavorite && 'MoviesCard__button_inFavoriteMovieList'}`}>{!movieInFavorite && 'Сохранить'}</button>}
            {pageType === SAVED_MOVIES && <button onClick={handleToggleFav} className='MoviesCard__button MoviesCard__button_inFavoriteList'></button>}


           </div>)
}

export default MoviesCard;
