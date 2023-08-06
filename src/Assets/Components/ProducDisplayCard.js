import React from "react";
import NeoMorphicIcon from "./NeoMorphicIcon";

import '../Styles/neomorphicStyles.css'
import '../Styles/textStyles.css'
import { useNavigate } from "react-router-dom";

export default function ProductDisplayCard({product})
{     

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

      const navigate = useNavigate();
      return (
    
        <div 
          className='neomorphic-card' 
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
        >
       
        <div className='image-display'>
        <img 
           src={ `${process.env.PUBLIC_URL}${productimageurl}`}/>
        </div> 

        <div 
          className='title-text'
          style={{
            fontSize: '1.6em',
            marginLeft: '20px',
            marginTop: '10px',
            alignSelf: 'flex-start'
          }}
        >{product.productname}</div>
        
        <div 
          className='title-text'
          style={{
            fontSize: '1.3em',
            marginLeft: '20px',
            alignSelf: 'flex-start',
            marginTop: '10px',
            marginBottom: 'auto'
          }}
        >{`$${product.productprice}`}</div>
        <NeoMorphicIcon 
          iconFilepath={`Images/shopping-cart` } 
          style = {{
            width: '50px',
            height: '50px',
            marginRight: "5%",
            alignSelf: 'flex-end',
            justifySelf: '', 
            bottom: "10px",
            top: 'auto'
          }}
        />

        </div>
 
        
  );
}