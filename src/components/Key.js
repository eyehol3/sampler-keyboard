import React from "react";

// import "./Keys.css";


export const Key = (props) => {
    const {keyName, keyCode, shiftState} = props;

   return (
       <div id={keyCode} className={`key ${keyName} ${shiftState? "shift-pressed":null}`}>{keyName}</div>
   ) 


}