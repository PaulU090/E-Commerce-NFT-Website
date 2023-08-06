import React from 'react';
import ProductDisplayCard from '../Components/ProducDisplayCard';

import { ProductsContext } from '../../App';
export default function useGetCards()
{
    const {products, setProducts} = React.useContext(ProductsContext);
    
    const entries = products.products;
    
    const productCards = entries.map((item, index) => {
        const itemImage = `${process.env.PUBLIC_URL}${item.productimageurl}`;
        return (
            <ProductDisplayCard 
                key = {index}
                product = {item}
            />
        )
    })

    return(
        productCards
    )
}
