import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({type, defaultToggle}){
    return (
       <div className="FilterCheckbox">
           <p className="FilterCheckbox__type">{type}</p>
           <label className="FilterCheckbox__switch">
               <input type="checkbox"
                      className="FilterCheckbox__input"/>
               <span className="FilterCheckbox__slider"></span>
           </label>

       </div>)
}

export default FilterCheckbox;