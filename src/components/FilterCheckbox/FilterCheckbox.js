import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({type, setFlag=()=>{}, currentFlag=false}){

    function handleShowFlagToggle(event){
        const flag = event.target.checked;
        setFlag(flag);
    }

    return (
       <div className="FilterCheckbox">
           <p className="FilterCheckbox__type">{type}</p>
           <label className="FilterCheckbox__switch">
               <input onClick={handleShowFlagToggle} type="checkbox"
               defaultChecked={currentFlag}
                      className="FilterCheckbox__input"/>
               <span className="FilterCheckbox__slider"></span>
           </label>

       </div>)
}

export default FilterCheckbox;
