import './App.css';
import {React, useState, useEffect, useRef} from 'react';
import {
    Routes,
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

import MoviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import MainApi from "../../utils/MainApi";

import {PAGE_TYPES} from "../../utils/Constants";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [favMoviesCards, setFavMoviesCards] = useState([]);


    const history = useHistory();
    let token = localStorage.getItem('token');
    const currentLocation = useLocation();
    const path = currentLocation.pathname;


    const {ALL_MOVIES, SAVED_MOVIES} = PAGE_TYPES;

    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            tokenChecker();
            firstRender.current = false;
        }
    });

    useEffect(() => {
        token = localStorage.getItem('token');
    },[currentUser]);

    function addMovieToFavorite(movie) {
        MainApi.addToFav(movie, token)
            .then(() => getFavMovies())
    }

    function removeMovieFromFavorite(movieID) {

        MainApi.removeFromFav(movieID, token)
            .then(()=> getFavMovies())
    }

    function tokenChecker() {
        const token = localStorage.getItem('token');
        if(token) {
            setIsLoggedIn(true);
            history.push(path);
            mainApi.setToken(token);
            mainApi.getUserData(token)
                .then((res) => {
                    const data = res.user ? res.user : {};
                    setCurrentUser(data);
                    getFavMovies();
                })
                .catch((e) => console.log(e));
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
    };

    function handleRegister(name, email, password) {
        return mainApi.createUser(name, email, password)
    }

    function handleLogin(email, password) {
        mainApi.login(email, password)
            .then((data) => {
                if (data.token) {
                    setIsLoggedIn(true);
                    localStorage.setItem('token', data.token);
                    mainApi.setToken(data.token);
                    history.push("/movies");               
                }
            })
            .then(()=> tokenChecker())
            .catch((err) => console.log(err));
    }

    function handleUpdateUserData(name, email) {
        mainApi
            .editUserData({ name, email }, token)
            .then((res) => {
                tokenChecker();
            })
            .catch((e) => console.log(e));
    }

    function handleLogout () {
        localStorage.clear();
        setIsLoggedIn(false);
        history.push("/");
        setCurrentUser({});
    };

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Main  loggedIn={isLoggedIn}/>
                    </Route>

                    <Route path="/signin">
                        <Login handleLogin={handleLogin}
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
                            // search={searchAllMovies}
                            // movies={allMovies}
                            // filtredMovies={searchResult}
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
