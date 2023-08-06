import React from "react";
import '../Styles/GridStyles.css'

export default function ProductGrid({products})
{
    return(
        <div className="gridContainer">
            {products}
        </div>
    )
}