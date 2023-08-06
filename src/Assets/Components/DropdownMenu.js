import React from "react";


export default function DropDownMenu({dropDownText, menu})
{
    const [open, setOpen] = React.useState(false);

    return(
        <div>
            <div
                className="selection-box"
                onClick={()=>{setOpen(prev => !prev)}}  
            >
                {dropDownText}
                <img 
                    src = {`${process.env.PUBLIC_URL}/Images/Down-Arrow-Icon.png`} 
                    className= {`selection-box-arrow${open ? ' selection-box-arrow-focused': ''}`}
                />
            </div>
            {open && menu}
        </div>
    )


}