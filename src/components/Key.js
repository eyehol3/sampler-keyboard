import React from "react";

// import "./Keys.css";


export const Key = (props) => {
    const {keyName, keyCode} = props;

   return (
       <div id={keyCode} className={`key ${keyName}`}>{keyName}</div>
   ) 


}