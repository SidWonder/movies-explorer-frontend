import React from "react";
import './ValidationError.css'

function ValidationError({errorText}){
    return(
        <p className="ValidationError">{errorText}</p>
    );
}

export default ValidationError;
