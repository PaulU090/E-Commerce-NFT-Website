import React from "react";
import '../Styles/OurStoryStyles.css'
import '../Styles/textStyles.css'
import '../Styles/SiteFooterStyles.css'

import { useNavigate } from "react-router-dom";

export default function OurStory()
{
    const navigate = useNavigate();
        
    return(
        <div>
            <div className="footer-divider-bar" style = {{width: "80%"}}></div>

            <div className="our-story">
                <div className="our-story-left">
                    <div className="title-text">{"Our Story"}</div>
                    <div className="basic-text">
                        {
                            "Bored Ape Escape, the best NFT shop on the web, began as a passion project in it's founder's garage. "
                        +   "the shop was small, but sold all kinds of Bored Ape NFTs that couldn't be found anywhere else."
                        }
                    </div>

                    <div className="basic-text">
                        {
                            "After the complete collapse of the United States Dollar in the great economic crisis of 2040, NFTs "
                        +   "exploded in popularity, and everyone wanted one! So, the founders transformed their NFT shop into a hub "
                        +   "for NFT investors of all stripes, and became integral to their community. Bored Ape Escape continues to offer "
                        +   "high quality NFTs at a price that everyone can afford."
                        }
                    </div>
            
                    <div 
                        className="read-more-button"
                        onClick = {()=> {navigate('/about')}}
                    >
                        <div className="title-text">{"Read More"}</div>
                    </div>
                </div>

                <img src = {`${process.env.PUBLIC_URL}/Images/OurStory.png`}></img>
            </div>
        </div>
    
    )
}