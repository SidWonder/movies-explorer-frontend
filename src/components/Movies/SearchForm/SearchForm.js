import React from "react";
import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm () {
    return (<form className="SearchForm">
        <label className="SearchForm__label">
            <input type="text" placeholder="Фильм" className="SearchForm__input"></input>
            <button className="SearchForm__button">Найти</button>
        </label>
        <FilterCheckbox type="Короткометражки" />
    </form>);
}

export default SearchForm;