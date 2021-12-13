import './App.css';
import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import Main from 'components/Main/Main';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route
                exact path="/"
                element={<Main/>} />
            <Route
                path="/movies"
                element={<Movies />} />
            <Route
                path="/saved-movies"
                element={<SavedMovies />} />
            <Route
                path="/profile"
                element={<Profile />} />
            <Route path="/signin"
                  element={ <Login />} />
            <Route
                exactly path="/signup"
                element={<Register />} />
            <Route path="/*" element={<NotFound />}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
