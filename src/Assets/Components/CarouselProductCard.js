import React from "react";
import '../Styles/CarouselProductCard.css'
import '../Styles/textStyles.css'
import { useNavigate } from "react-router-dom";
//Simplified product card to be used in carousel
export default function CarouselProductCard({product})
{
    const [carouselProduct, setCarouselProduct ] = React.useState(product)
    
    const navigate = useNavigate();
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

    return(
        <div 
            className="carousel-product-card" 
            onClick={()=>{
                window.scrollTo({top: 0, left: 0, behavior: "instant"})
                navigate(
                    {
                        pathname: "/singleproduct",
                        search: `itemId=${product.productid}`
                    }, 
                    {
                        state : { product: carouselProduct}
                    }
                );
            }}>
            <img src={productimageurl} />
            <div className="title-text">{productname}</div>
            <div className="basic-text">{productseller}</div>
            <div className="title-text">{`$${productprice}`}</div>
        </div>
    )
}