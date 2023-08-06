import React from "react";
import "../Styles/textStyles.css"
import "../Styles/SingleProductPage.css"
import Select from "./Select";
import Carousel from "./Carousel";
import CarouselProductCard from "./CarouselProductCard";
import { ProductsContext } from "../../App";

import usePostCart from "../Hooks/usePostCart";

export default function SingleProductView({product}){
    const {products, setProducts} = React.useContext(ProductsContext)
    const [productQuantity, setProductQuantity] = React.useState(1);
    const [postingCart, setPostingCart] = usePostCart(product, productQuantity)

    const {
        productname, 
        productimageurl, 
        productprice, 
        productquantityavailable, 
        productdescription, 
        productisonsale, 
        productsaleprice,
        productseller
      } = product;
   

    const carouselContents = products.products.slice(0, 10).map((current, i) => {
        return (
            <CarouselProductCard 
                key = {i}
                product = {current}
            />
        )
    });

    const ChangeSelection = (selection)=> {
        setProductQuantity(Number(selection));
        console.log(selection);
    }

    const postCartItem = ()=> {
        setPostingCart(true);
    }

    return(
        <div>
            <div className="twoColumns">
                <div><img className="productColumnMainImage" src = {`${process.env.PUBLIC_URL}${productimageurl}`}/></div>
                <div>
                    <div style={{marginBottom:"0"}}className="title-text">{productseller}</div>
                    <div style={{fontSize:"1.2em"}} className="title-text">{productname}</div>
                    <div className="basic-text">{productdescription}</div>
                    <div style={{marginBottom:"0"}} className="basic-text">{"QTY"}</div>
                    <Select 
                        style = {{
                            width: '80px',
                            marginLeft: '5px'
                        }}
                        initialText={"1"} 
                        options={[1,2,3]}
                        onChangeSelection={(selection)=> {ChangeSelection(selection)}}    
                    />
                    <div 
                        className="title-text"
                        style={{marginTop:"15%"}}
                    >
                        {`$${Number(productQuantity) * Number(product.productprice)}`}
                    </div>
                    <div  
                        className="submit-button"
                        onClick = {()=> {postCartItem()}}    
                    >
                            {"Add to cart"}
                    </div>
                </div>
            </div>

            <div style={{fontSize:"1.4em"}} className="title-text">{"You might also like"}</div>
            <Carousel carouselContents={carouselContents}/>
            
        </div>
    )
}