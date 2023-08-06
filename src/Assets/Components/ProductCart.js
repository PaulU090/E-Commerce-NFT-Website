import React from "react";
import "../Styles/textStyles.css"
import { CartContext } from "../../App";
import useGetCart from "../Hooks/useGetCart";
import { useNavigate } from "react-router-dom";

export default function ProductCart()
{
    const navigate = useNavigate();
    const {cart, setCart} = React.useContext(CartContext);
    
    const [quantity, setQuantity] = React.useState(cart.cartItems.length);

    React.useEffect(()=>{
        setQuantity(cart.cartItems.length);        
    }, [cart])

    return(
        <
            div style={{cursor: "pointer"}}
            onClick={()=> {navigate('/cart')}}
        >
            <img src={`${process.env.PUBLIC_URL}Images/shopping-cart.png`}style={{width:"40px",height:"40px"}}/>
            <div className="title-text">{quantity}</div>
        </div>
    )
}