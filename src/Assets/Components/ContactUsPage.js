import React from "react";
import '../Styles/AboutPage.css'
import SiteHeader from './SiteHeader.js'
import SiteFooter from './SiteFooter.js'
import '../Styles/SingleProductPage.css'
import '../Styles/ContactPage.css'

export default function ContactUsPage()
{
    window.scrollTo({top: 0, left: 0, behavior: "instant"})

    return(
        <div>
            <SiteHeader />
                <div className="about">
                    <div className="title-text">{"Contact Us"}</div>
                    <div className="basic-text">
                        {
                            "After the complete collapse of the United States Dollar in the great economic crisis of 2040, NFTs "
                        +   "exploded in popularity, and everyone wanted one! So, the founders transformed their NFT shop into a hub "
                        +   "for NFT investors of all stripes, and became integral to their community. Bored Ape Escape continues to offer "
                        +   "high quality NFTs at a price that everyone can afford."
                        }
                    </div>
                    <div className="title-text">
                        { 
                            "For all product requests, please either call us or "
                            + "visit our store to inquire about availability."    
                        }     
                    </div>
                    <div 
                        className="twoColumns-contact"
                        style={{width: '90%', left: '0%'}}
                    >
                        <div>
                            <div className="title-text" style={{textAlign: 'center'}}>{"VISIT OUR STORE"}</div>
                            <div 
                                className="footer-column-bar" 
                                style={{marginBottom: '10px'}}
                            ></div>
                            <div className="title-text">{"900 University Ave."}</div>
                            <div className="title-text">{"Riverside, CA"}</div>
                            <div className="title-text">{"555-555-5555"}</div>
                            <div style = {{marginTop: '10px', marginBottom: '10px'}}></div>

                            <div className="title-text">{"MON-FRI 9:00-8:00"}</div>
                            <div className="title-text">{"SAT 10:00-7:00"}</div>
                            <div className="title-text">{"SUN 10:00-6:00"}</div>
                        </div>
                        <img src = {`${process.env.PUBLIC_URL}/Images/UCRMapsScreenshot.png`}></img>
                    </div>
                    
                    
                </div>
            <SiteFooter />
        </div>
    )


}