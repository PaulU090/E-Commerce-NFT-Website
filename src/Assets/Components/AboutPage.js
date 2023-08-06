import React from "react";
import '../Styles/AboutPage.css'
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function AboutPage()
{
    window.scrollTo({top: 0, left: 0, behavior: "instant"})

    return(
        <div>
            <SiteHeader />
            <div className="about">
                <div className="title-text">{"About Us"}</div>
                <img src = {`${process.env.PUBLIC_URL}/Images/OurStory.png`}></img>
                <div className="title-text">
                    { "Bored Ape Escape, the best NFT shop on the web, began as a passion project in it's founder's garage. "
                    +   "the shop was small, but sold all kinds of Bored Ape NFTs that couldn't be found anywhere else."}
                </div>

                <div className="basic-text">
                    {
                        "After the complete collapse of the United States Dollar in the great economic crisis of 2040, NFTs "
                    +   "exploded in popularity, and everyone wanted one! So, the founders transformed their NFT shop into a hub "
                    +   "for NFT investors of all stripes, and became integral to their community. Bored Ape Escape continues to offer "
                    +   "high quality NFTs at a price that everyone can afford."
                    }
                </div>
            </div>
            <SiteFooter />
        </div>


    )


}