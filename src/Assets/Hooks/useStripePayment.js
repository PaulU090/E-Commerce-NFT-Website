import React from "react";
import useGetCart from "./useGetCart";
import { CartContext } from "../../App";

export default function useStripePayment()
{
    const[purchasing, setPurchasing] = React.useState(false);
    const {cart, setCart} = React.useContext(CartContext);

    React.useEffect(()=>{    
        const fetchData = async(bodyData)=> {
            try{
                const data = await fetch('../api/v1/purchase', 
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
                window.location = json.url;
                return json;
            }
            catch(err)
            {
                console.log(err);
                throw err;
            }
            
        }

        if(purchasing)
        {
            let bodyData = {
                items: cart.cartItems
            }
            const res = fetchData(bodyData)
                .catch(err => {console.log(err)})            
        }
}, [purchasing])


return [purchasing, setPurchasing];

}