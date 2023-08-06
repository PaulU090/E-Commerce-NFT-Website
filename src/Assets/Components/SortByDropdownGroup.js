import React from "react";
import SortByDropdown from './SortByDropdown.js'

export default function SortByDropdownGroup({})
{    
    return(
        <div className="sort-by-dropdown-group">
            <div>Sort By</div>
            <SortByDropdown placeHolder="Select..." />
        </div>
    );
}