import React, {useEffect, useState, useMemo, useReducer} from "react";
import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import MoviesApi from "../../utils/MoviesApi";
import {PAGE_TYPES, shortFilmDuration, showMoviesSettings} from "../../utils/Constants";
import {loadJSON, saveJSON} from "../../utils/functions";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function Movies({ addMovieToFav, removeMovieFromFav, favMovies, loggedIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesFromApi, setMoviesFromApi] = useState([]);
  const [searchQuery, setSearchQuery] = useState(loadJSON('searchQueryYa') ||null);
  const [shortFilmFlag, setShortFilmFlag] = useReducer(checked => !checked, loadJSON('shortFilmFlag') || false);
  const [moviesForRenderConfig, setMoviesForRenderConfig] = useState(showMoviesSettings.large);
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
  useEffect(()=>{
    async function fetchData() {
      const moviesApi = await MoviesApi.getData();
      return moviesApi;
    }
    const moviesLS = loadJSON("beatFilmDB");
    if(searchQuery && !moviesLS) {
      setIsLoading(true);
      fetchData()
        .then((res) => {
          setMoviesFromApi(res);
          saveJSON("beatFilmDB", res);
          setIsLoading(false)
        })
        .catch(e => console.log(e))
    } else if (searchQuery && moviesLS) {
      setMoviesFromApi(moviesLS);
    } else {
      return;
    }
  }, [searchQuery])

const mvs = useMemo(()=>{
if(searchQuery) {
  const filterApiMovies = () =>{
    const pureQuery = searchQuery.trim();
    const reg = new RegExp(pureQuery, "gi");

    let searchResults = moviesFromApi.filter(x => {
      return x.nameRU.match(reg)
        || (x.nameEN && x.nameEN.match(reg))
        || (x.description && x.description.match(reg))
    });
    if(shortFilmFlag) {
      searchResults = searchResults.filter(x => x.duration <= shortFilmDuration);
    }
      saveJSON("searchResults", searchResults);
      saveJSON("searchQueryYa", searchQuery);
      saveJSON('shortFilmFlag', shortFilmFlag);
    if (searchResults.length) {
      return searchResults;
    } else {
      return 'nullSearch';
    }
  }
  const mvs = filterApiMovies();
  return mvs;
}
}, [moviesFromApi, shortFilmFlag])

  useEffect(()=>{
    setMovies(mvs);
  }, [mvs])
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

  function handleToggleShortFilmFlag(){
    saveJSON('shortFilmFlag',  shortFilmFlag)
    setShortFilmFlag();
  }


  return (
    <section className="Movies">
      <Header loggedIn={loggedIn} pageType={ALL_MOVIES} />
      <div className="Movies__container">
        <SearchForm
         searchInputQuery = {searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <FilterCheckbox
          type="Короткометражки"
          setFlag={handleToggleShortFilmFlag}
          currentFlag={shortFilmFlag}
        />
      </div>

      {moviesForRender && moviesForRender.length &&
// @ts-ignore
      (moviesForRender !== "nullSearch" && moviesForRender !== "nullS") && (
        <MoviesCardList
          cards={moviesForRender}
          favMovies={favMovies}
          pageType={ALL_MOVIES}
          addMovieToFav={addMovieToFav}
          removeMovieFromFav={removeMovieFromFav}
        />
      )}
      {
// @ts-ignore
      (moviesForRender === "nullSearch" || moviesForRender === "nullS")  && (
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
