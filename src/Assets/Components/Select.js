import React from "react";

import '../Styles/SelectStyles.css'

//Custom select form
export default function Select({options, initialText, style, onChangeSelection})
{
    const [focused, setFocused] = React.useState(false)
    const [currentSelection, setCurrentSelection] = React.useState(initialText ? initialText : "Sort By")
    
    const optionsDivs = options.map((current, index) => {
        return (
            <div 
                className="selection-dropdown-option"
                ref = {el => ref.current[index+1] = el}
                onClick={()=>{
                    setCurrentSelection(current)
                    setFocused(false);
                    if(onChangeSelection){ 
                        onChangeSelection(current);
                    }
                }}
                key={index}
            >
                {current}
            </div>
        )
    })

    const ref = React.useRef([]);

    React.useEffect(()=>{
        const HandleClick = (e)=>{
            let containsPos = false;
            for(let i = 0; i < ref.current.length; i++)
            {
                if(ref.current[i] !== null && ref.current[i].contains(e.target))
                {
                    containsPos = true;
                    break;
                }
            }

            if(!containsPos)
            {
                setFocused(false)
            }
        }
        document.addEventListener('mousedown', HandleClick);

        return(
            document.removeEventListener('mousedowm', HandleClick)
        )
    })




    return(
        <div style = {style}>
            <div 
                className="selection-box"
                onClick={()=>{setFocused(prev => !prev)}}
                ref ={el => ref.current[0] = el}
            >
                {currentSelection}
                <img 
                    src = {`${process.env.PUBLIC_URL}/Images/Down-Arrow-Icon.png`} 
                    className= {`selection-box-arrow${focused ? ' selection-box-arrow-focused': ''}`}
                />
            </div>
            <div 
                className="selection-dropdown"
                style = {{
                    display : focused ? '' : 'none',
                    pointerEvents: focused ? '' : 'none',
                }}    
            >
                {optionsDivs}
            </div>
        </div>
    )
}