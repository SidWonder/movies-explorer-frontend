import React, { useEffect, useState } from "react";
import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import MoviesApi from "utils/MoviesApi";
import { PAGE_TYPES, showMoviesSettings } from "../../utils/Constants";

function Movies({ addMovieToFav, removeMovieFromFav, favMovies, loggedIn }) {
  const [isLoading, setIsLoading] = useState(false);

  const [moviesForRender, setMoviesForRender] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesFromApi, setMoviesFromApi] = useState([]);

  const [moviesForRenderConfig, setMoviesForRenderConfig] = useState(
    showMoviesSettings.large
  );
  const [screenWidth, setScreenWidth] = useState(0);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const { ALL_MOVIES } = PAGE_TYPES;

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    if (screenWidth <= 760) {
      setMoviesForRenderConfig(showMoviesSettings.small);
    }
    if (screenWidth > 760 && screenWidth <= 900) {
      setMoviesForRenderConfig(showMoviesSettings.medium);
    }
    if (screenWidth > 900) {
      setMoviesForRenderConfig(showMoviesSettings.large);
    }
  }, [screenWidth]);

  useEffect(() => {
    setMoviesForRender(movies?.slice(0, moviesForRenderConfig.onStart));
    setShowMoreButton(true);
  }, [movies, moviesForRenderConfig.onStart]);


  useEffect(() => {
    function handleScreenResize() {
      setTimeout(setNewWidth, 600);
    }

    window.addEventListener("resize", handleScreenResize);

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  useEffect(() => {
    if (moviesForRender?.length === movies?.length) {
      setShowMoreButton(false);
    }
  }, [movies, moviesForRender]);

  useEffect(() => {
    getMoviesFromApi()
    const savedFilteredMovies = JSON.parse(localStorage.getItem('searchResults'));
    if (savedFilteredMovies) {
        setMovies(savedFilteredMovies);
    }
}, [])

  function setNewWidth() {
    setScreenWidth(window.innerWidth);
  }

  function handleShowMore() {
    setMoviesForRender([
      ...moviesForRender,
      ...movies.slice(
        moviesForRender.length,
        moviesForRender.length + moviesForRenderConfig.addMore
      ),
    ]);
  }

  function getMoviesFromApi() {
    setIsLoading(true);
    const moviesApiList =  localStorage.getItem("beatFilmDB")
    if (!moviesApiList) {
      return MoviesApi.getData()
        .then((res) => {
          setMoviesFromApi(res);
          localStorage.setItem("beatFilmDB", JSON.stringify(res));
        })
        .then(() => setIsLoading(false));
    } else {
      setMoviesFromApi(JSON.parse(moviesApiList));
    }
    setIsLoading(false);
  }

  return (
    <section className="Movies">
      <Header loggedIn={loggedIn} pageType={ALL_MOVIES} />
      <SearchForm
        pageType={ALL_MOVIES}
        setMovies={setMovies}
        moviesForSrch={moviesFromApi}
        setIsLoading={setIsLoading}
      />
      {moviesForRender.length && moviesForRender !== "nullSearch" && (
        <MoviesCardList
          cards={moviesForRender}
          favMovies={favMovies}
          pageType={ALL_MOVIES}
          addMovieToFav={addMovieToFav}
          removeMovieFromFav={removeMovieFromFav}
        />
      )}
      {moviesForRender === "nullSearch" && (
        <p className="Movies__null-search">Ничего не найдено</p>
      )}
      {isLoading && <Preloader />}
      {moviesForRender?.length > 0 && showMoreButton && (
        <button
          className="Movies__show-more-button"
          type="button"
          onClick={handleShowMore}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default Movies;
