import React from "react";
import '../Styles/neomorphicStyles.css'

export default function NeoMorphicIcon({iconFilepath, style, callback})
{
    const [clicked, setClicked] = React.useState(false);

    function Toggle()
    {
        setClicked(prev => !prev);
        if(callback)
        {
            callback();
        }
    }

    return(
        <div 
            className= {clicked ? "neomorphic-button-flat-pressed" : "neomorphic-button-flat-unpressed"}
            onClick={()=>{Toggle()}}   
            style = {{...style}}
        >    
            <img src= {`${process.env.PUBLIC_URL}${iconFilepath}${clicked ? '-selected' : ''}.png`}/>
        </div>
    )
}