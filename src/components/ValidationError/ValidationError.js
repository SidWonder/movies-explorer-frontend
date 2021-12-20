import React from "react";

function ValidationError({errorText, formType}){
    return(
        <p className="ValidationError">{errorText}</p>
    );
}

export default ValidationError;