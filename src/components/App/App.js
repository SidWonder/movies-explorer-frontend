import './App.css';
import React, { useState, useEffect, useRef} from 'react';
import {
    Route,
    useHistory,
    Switch,
    useLocation
} from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";

import mainApi from "../../utils/MainApi";
import {loadJSON, saveJSON} from "../../utils/functions"
import {PAGE_TYPES} from "../../utils/Constants";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [favMoviesCards, setFavMoviesCards] = useState([]);
    const [errorsLogin, setErrorLogin] = useState(null);


    const history = useHistory();
    let token = localStorage.getItem('token');
    const currentLocation = useLocation();
    const path = currentLocation.pathname;

    const {SAVED_MOVIES} = PAGE_TYPES;

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            tokenChecker();
            firstRender.current = false;
        }
    });

    useEffect(()=> {},[errorsLogin])
    useEffect(() => {
        token = localStorage.getItem('token');
    },[currentUser]);

    function addMovieToFavorite(movie) {
      mainApi.addToFav(movie, token)
            .then(() => getFavMovies())
            .catch(err => console.log(err))
    }

    function removeMovieFromFavorite(movieID) {

      mainApi.removeFromFav(movieID, token)
            .then(()=> getFavMovies())
            .catch(err => console.log(err))
    }

    function tokenChecker() {
        const token = localStorage.getItem('token');
        if(token) {
            setIsLoggedIn(true);
            history.push(path);
            mainApi.setToken(token);
            mainApi.getUserData(token)
            .then((res) => {
              if (res.status === 401) {
                  throw new Error(
                      "Токен не передан или передан не в том формате"
                  );
              } else if (res.status === 400) {
                  throw new Error("Переданный токен некорректен");
              } else {
                  return res;
              }
          })
          .then((res) => {
                    const data = res.user ? res.user : {};
                    setCurrentUser(data);
                    getFavMovies();
                })
                .catch((err) => console.log(err));
        } else {
            return;
        }
    }

    function getFavMovies () {
        const token = localStorage.getItem('token');
        mainApi.getFavMovies(token)
            .then(res => {
                setFavMoviesCards(res);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function handleRegister(name, email, password) {
        return mainApi.createUser(name, email, password).catch(err=> console.log(err))
    }

    function handleLogin(email, password) {
        mainApi.login(email, password)
            // .then((data) => {
            //     if (data.token) {
            //         setIsLoggedIn(true);
            //         localStorage.setItem('token', data.token);
            //         mainApi.setToken(data.token);
            //         history.push("/movies");
            //     }
            // })
            .then((data) => {
              console.log('handleLogin',data)

                  setIsLoggedIn(true);
                  localStorage.setItem('token', data.token);
                  mainApi.setToken(data.token);
                  history.push("/movies");
            })
            .then(()=> tokenChecker())
            .catch((err) => {
              console.log(err)
              if (err === 400) {
                setErrorLogin('не передано одно из полей');
                  throw new Error('не передано одно из полей');
              } else if (err === 401) {
                setErrorLogin('Неправильные почта или пароль');
                  throw new Error('Неправильные почта или пароль');
              } else {
              console.log(err);
          }
        });
    }

    function handleUpdateUserData(name, email) {
        mainApi
            .editUserData({ name, email }, token)
            .then(() => {
                tokenChecker();
            })
            .catch((e) => console.log(e));
    }

    function handleLogout () {
        localStorage.clear();
        setIsLoggedIn(false);
        history.push("/");
        setCurrentUser({});
    }

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Main  loggedIn={isLoggedIn}/>
                    </Route>

                    <Route path="/signin">
                        <Login handleLogin={handleLogin}
                                errorsLogin={errorsLogin}
                               loggedIn={isLoggedIn}/>
                    </Route>
                    <Route
                        path="/signup">
                        <Register handleRegister={handleRegister}
                                    handleLogin={handleLogin}
                                  loggedIn={isLoggedIn}/>
                    </Route>
                    <ProtectedRoute
                        path='/movies'
                        redirectTo='/signin'
                        hasPermission={isLoggedIn}>
                        <Movies
                            logout = {handleLogout}
                            loggedIn={isLoggedIn}
                            favMovies={favMoviesCards}
                            addMovieToFav={addMovieToFavorite}
                            removeMovieFromFav={removeMovieFromFavorite}
                            getFavMovies={getFavMovies}
                        />
                        <Footer />
                    </ProtectedRoute>

                    <ProtectedRoute
                        path="/saved-movies"
                        redirectTo='/signin'
                        hasPermission={isLoggedIn}>
                        <SavedMovies
                            logout = {handleLogout}
                            setFavMoviesCards={setFavMoviesCards}
                            loggedIn={isLoggedIn}
                            movies={favMoviesCards}
                            removeMovieFromFav={removeMovieFromFavorite}
                            getFavMovies={getFavMovies}
                            pageType = {SAVED_MOVIES}
                        />
                        <Footer />
                    </ProtectedRoute>
                    <ProtectedRoute
                        path="/profile"
                        redirectTo='/signin'
                        hasPermission={isLoggedIn}>
                        <Profile
                            logout = {handleLogout}
                            handleUpdateUserData={handleUpdateUserData}
                            loggedIn={isLoggedIn}
                        />
                    </ProtectedRoute>
                    <Route path="/*">
                        <NotFound/>
                    </Route>
                </Switch>

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
