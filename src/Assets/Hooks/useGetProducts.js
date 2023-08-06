import React from "react";
import { ProductsContext } from "../../App.js";


export default function useGetProducts()
{
    const[fetchingProducts, setFetchingProducts] = React.useState(true);
    const {products, setProducts} = React.useContext(ProductsContext);
   
    React.useEffect(()=>{    
        if(fetchingProducts || products.requiresUpdate)
        {
            fetch('../api/v1/products', 
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then(res => {
                const{payload} = res;
                setProducts({
                    requiresUpdate: false,
                    products : payload
                })
            })
            .then(()=> {
                setFetchingProducts(false);
            })
        }
    }, [fetchingProducts])

    return [fetchingProducts, setFetchingProducts];
}