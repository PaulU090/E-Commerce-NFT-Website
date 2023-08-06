import React from "react";
import ProductSearchBar from '../Components/ProductSearchBar';
import ProductCart from '../Components/ProductCart';
import { useNavigate } from "react-router-dom";

import '../Styles/textStyles.css'
import '../Styles/SiteHeaderStyles.css'
import '../Styles/SiteFooterStyles.css'

import { CartContext } from "../../App";
import useGetCart from "../Hooks/useGetCart";

export default function SiteHeader({})
{
    const {cart, setCart} = React.useContext(CartContext);
    const navigate = useNavigate();
    const [fetchingCart, setFetchingCart] = useGetCart();

    React.useEffect(()=> {
        if(cart.requiresUpdate)
        {
            console.log('cart requires update')
            setFetchingCart(true);        
        }
    }, [cart, fetchingCart])

    return(
        <div>
            <div className="site-header">
                <ProductSearchBar/>
                <div className='title-text'>Bored Ape Escape</div>
                <div className="cart-group">
                    <div className="title-text" onClick={()=>{navigate('/login')}}>Sign In</div>
                    <ProductCart/>
                </div>
            </div>
            <div className="footer-divider-bar"></div>
            <div className="navigation-menu">
                <div className="navigation-menu-item">
                    <div 
                        className="title-text"
                        onClick = {()=> {navigate('/')}}    
                    >
                    {"Home"}</div>
                </div>
                <div className="navigation-menu-item">
                    <div 
                        className="title-text"
                        onClick = {()=> {navigate('/shop')}}
                    >{"Shop"}</div>
                </div>
                {/* <div className="navigation-menu-item">
                    <div className="title-text">{"News & Events"}</div>
                </div>*/}
                <div 
                    className="navigation-menu-item"
                    onClick = {()=> {navigate('/about')}}
                >
                    <div className="title-text">{"About"}</div>
                </div>
                <div className="navigation-menu-item">
                    <div 
                        className="title-text"
                        onClick = {()=> {navigate('/contact')}}
                    >{"Contact"}</div>
                </div>
            </div>
            <div className="footer-divider-bar"></div>
        </div>
    )
}