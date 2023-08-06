import './App.css';
import './Assets/Styles/neomorphicStyles.css'
import './Assets/Styles/textStyles.css'
import './Assets/Styles/GridStyles.css'

import './Assets/Hooks/useGetCards.js'

import ProductViewPage from './Assets/Components/ProductViewPage.js'
import Homepage from './Assets/Components/HomePage';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import SingleProductPage from './Assets/Components/SingleProductPage';
import AboutPage from './Assets/Components/AboutPage';
import LoginPage from './Assets/Components/LoginPage';
import React from 'react';
import ContactUsPage from './Assets/Components/ContactUsPage';
import CartPage from './Assets/Components/CartPage';
import OrderSummaryPage from './Assets/Components/OrderSummaryPage.js'

export const OrdersContext = React.createContext();
export const ProductsContext = React.createContext();
export const CartContext = React.createContext();
function App() {
  const[products, setProducts] = React.useState({products: [], requiresUpdate: false});
  const[cart, setCart] = React.useState({cartItems: [], requiresUpdate: false});
  const [orders, setOrders] = React.useState({orders: [], requiresUpdate: true});

  return (
    <CartContext.Provider value={{cart: cart, setCart : setCart}} >
    <ProductsContext.Provider value = {{products: products, setProducts: setProducts}}>    
    <OrdersContext.Provider value = {{orders : orders, setOrders : setOrders}}>    
    
      <Router>
        <Routes>
          <Route exact path = '/' element = {<Homepage />}></Route>
          <Route exact path = '/shop' element = {<ProductViewPage />}></Route>
          <Route exact path = '/singleproduct' element = {<SingleProductPage />}></Route>
          <Route exact path = '/about' element = {<AboutPage />}></Route>        
          <Route exact path = '/contact' element = {<ContactUsPage />}></Route>   
          <Route exact path = '/login' element = {<LoginPage />}></Route>   
          <Route exact path = '/cart' element = {<CartPage />}></Route>   
          <Route exact path = '/ordersummary' element = {<OrderSummaryPage/>}></Route>   
        </Routes>
      </Router>
    </OrdersContext.Provider>
    </ProductsContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
