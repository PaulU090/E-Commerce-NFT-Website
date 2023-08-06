import React from "react";
import useGetCart from "./useGetCart";
import { CartContext } from "../../App";

export default function usePostCart(product, quantity)
{
    const[postingCart, setPostingCart] = React.useState(false);
    const {cart, setCart} = React.useContext(CartContext);

    React.useEffect(()=>{    
        const fetchData = async(bodyData)=> {
            try{
                const data = await fetch('../api/v1/cart', 
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization" : `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(bodyData)
                })
                const json = await data.json();
                return json;
            }
            catch(err)
            {
                console.log(err);
                throw err;
            }
            
        }

        if(postingCart)
        {
            let bodyData = {
                cartProductId: product.productid,
                cartQuantity: quantity
            }   
            const res = fetchData(bodyData)
                .then((res)=>{
                    let currCart = {
                        cartItems: cart.cartItems,
                        requiresUpdate: true
                    };
                    setCart(currCart);

                })
                .then(()=> {
                    setPostingCart(false);
                })
                .catch(err => {console.log(err)})            
        }
}, [postingCart])


return [postingCart, setPostingCart];

}