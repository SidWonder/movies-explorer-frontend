import './App.css';
import React from 'react';
import Main from 'components/Main/Main';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import Footer from "../Footer/Footer";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";


function App() {
  return (
    <div className="App">
        {/*<Main/>*/}
        {/*<Movies />*/}
        {/*<SavedMovies />*/}
        {/*<Register />*/}
        {/*<Login />*/}
        {/*<Footer/>*/}
        <Profile />
    </div>
  );
}

export default App;
