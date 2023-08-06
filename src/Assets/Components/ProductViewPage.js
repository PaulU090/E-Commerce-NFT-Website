import React from "react";
import ProductGrid from './ProductGrid.js';
import ProductViewLabel from './ProductViewLabel.js'
import ProductFilterHeader from './ProductFilterHeader.js'
import useGetCards from '../Hooks/useGetCards.js';
import ProductFilter from './ProductFilter.js'
import '../Styles/GridStyles.css'
import '../Hooks/useGetCards.js'
import '../Styles/ProductViewPageStyles.css'
import SiteHeader from "./SiteHeader.js";
import SiteFooter from "./SiteFooter.js";
import { ProductsContext } from "../../App.js";
import useGetProducts from "../Hooks/useGetProducts.js";
import Spinner from "./Spinner.js";


export default function ProductViewPage() {
  const{products, setProducts} = React.useContext(ProductsContext);
  const[fetchingProducts, setFetchingProducts] = useGetProducts();
  const productCards = useGetCards();
  
  React.useEffect(()=>{}, [fetchingProducts])
  

  window.scrollTo({top: 0, left: 0, behavior: "instant"})

  if(fetchingProducts)
  {
    return(
      <div>
        <SiteHeader />
        <Spinner style = {{
            width: '100%',
            justifyContent: 'center'
        }}/>
        <SiteFooter />
      </div>
    )
  }

  return (
      <div>
      <SiteHeader />
      <ProductViewLabel/>
      <ProductFilterHeader/>
        <div className="product-viewpage-body">
          <ProductFilter/>
          <ProductGrid products={productCards}/>
        </div>
        <SiteFooter />
      </div>
    );
  }
  