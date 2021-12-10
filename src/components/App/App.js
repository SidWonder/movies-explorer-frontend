import './App.css';
import React from 'react';
import Main from 'components/Main/Main';
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="App">
        {/*<Main/>*/}
        <Movies />
        <Footer/>
    </div>
  );
}

export default App;
