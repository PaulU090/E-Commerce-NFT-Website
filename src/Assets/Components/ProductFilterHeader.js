import React from "react";
import '../Styles/textStyles.css'
import '../Styles/ProductFilterHeader.css'
import SortByDropdown from './SortByDropdown.js'
import Select from "./Select";

export default function ProductFilterHeader({})
{
    
    return(
        <div className="product-filter-header">
            <div className="title-text">{'Filter By:'}</div>
            <Select 
                style = {{
                    width: '160px'
                }}
                options = {[
                    'A-Z',
                    'Price (High-Low)',
                    'Price (Low-High)',
                    'Latest',
                    'Most Popular'
                ]}
            />
        </div>
    )
}