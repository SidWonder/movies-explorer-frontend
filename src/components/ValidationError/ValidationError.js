import React from "react";
import './ValidationError.css'

function ValidationError({errorText, formType}){
    return(
        <p className="ValidationError">{errorText}</p>
    );
}

export default ValidationError;