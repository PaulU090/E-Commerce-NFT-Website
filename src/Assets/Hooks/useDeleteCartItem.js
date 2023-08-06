import React from "react";
import useGetCart from "./useGetCart";
import { CartContext } from "../../App";

export default function useDeleteCartItem(product)
{
    const[deletingCartItem, setDeletingCartItem] = React.useState(false);
    const {cart, setCart} = React.useContext(CartContext);

    React.useEffect(()=>{    

        const fetchData = async(bodyData)=> {
            try{
                const data = await fetch(`../api/v1/cart/${product.cartentryid}`, 
                {
                    method: "DELETE",
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

        if(deletingCartItem)
        {
            let bodyData = {
                cartProductId: product.productid
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
                    setDeletingCartItem(false);
                })
                .catch(err => {console.log(err)})            
        }
    }, [deletingCartItem])

    return [deletingCartItem, setDeletingCartItem];
}