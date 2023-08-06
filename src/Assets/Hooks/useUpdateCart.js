import React from "react";
import useGetCart from "./useGetCart";
import { CartContext } from "../../App";

export default function useUpdateCartItem()
{
    const[updatingCartItem, setUpdatingCartItem] = React.useState(false);
    const[product, setProduct] = React.useState(null);

    const {cart, setCart} = React.useContext(CartContext);

    React.useEffect(()=>{    
        const fetchData = async(bodyData)=> {
            try{
                const data = await fetch(`../api/v1/cart/${product.cartentryid}`, 
                {
                    method: "PATCH",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization" : `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(bodyData)
                })
                const json = await data.json();
                console.log(JSON.stringify(json));
                return json;
            }
            catch(err)
            {
                console.log(err);
                throw err;
            }
            
        }

        if(updatingCartItem)
        {
            let bodyData = product 
            const res = fetchData(bodyData)
                .then((res)=>{
                    let currCart = {
                        cartItems: cart.cartItems,
                        requiresUpdate: true
                    };
                    setCart(prev => currCart);
                })
                .then(()=> {
                    setUpdatingCartItem(false);
                })
                .catch(err => {console.log(err)})            
        }
    }, [updatingCartItem])

    return [updatingCartItem, setUpdatingCartItem, product, setProduct];
}