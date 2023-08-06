import React from "react";

import "../Styles/SearchBarStyles.css"

export default function ProductSearchBar({})
{
    const [searchInput, setSearchInput] = React.useState("");
    
    return(
        <form className="search-bar">
            <input 
                type="text"
                value={searchInput}
                size={"5"}
                onChange={(e)=>{setSearchInput(e.target.value)}}
            >

            </input>
            <img src={`${process.env.PUBLIC_URL}Images/search-icon.png`}/>
        </form>
    )
}