import React from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/textStyles.css'
import '../Styles/HomepageHeroStyles.css'
import '../Styles/SiteFooterStyles.css'

export default function HomepageHero({imageUrl, title})
{
    const navigate = useNavigate();

    return(
        <div className="homepage-hero">
            <img src={imageUrl}/>
            <div className="homepage-hero-title">
                <div className="title-text">
                    {title}
                </div>

                <div 
                    className="title-text"
                    onClick={()=> {navigate('/shop')}}
                >{"SHOP NOW"}</div>
            </div>
            <div className="footer-divider-bar"></div>
        </div>
    )

}