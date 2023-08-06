import React from "react";
import '../Styles/spinnerStyles.css'

export default function Spinner({style})
{
    

    return (
        <div 
            className="lds-spinner"
            style= {{
                ...style,
                transform: "scale(0.3)",
            }}
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}