import React from "react";
import '../Styles/CartPageStyles.css'
import '../Styles/textStyles.css'

import useDeleteCartItem from "../Hooks/useDeleteCartItem";
import { useNavigate } from "react-router-dom";

export default function CartPageItemView({product, canRemove})
{
    const navigate = useNavigate()
    const [deletingCartItem, setDeletingCartItem] = useDeleteCartItem(product);

    return(
        <div className="cartpage-product-card">
            <img 
                src = {`${process.env.PUBLIC_URL}${product.productimageurl}`}
                onClick={()=>{
                    window.scrollTo({top: 0, left: 0, behavior: "instant"})
                    navigate(
                    {
                      pathname: "/singleproduct",
                      search: `itemId=${product.productid}`
                    }, 
                    {
                      state: {product : product}
                    }
                  )}}  
            />
            <div>
                <div className="title-text">{product.productseller}</div>
                <div className="title-text">{product.productname}</div>    
         
                {canRemove && <div 
                    onClick={()=>{setDeletingCartItem(true)}}
                    className="basic-text"
                    style = {{
                        color: 'rgba(200, 10, 20)',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}
                >{'Remove'}</div>}
            </div>
        </div>
    )




}