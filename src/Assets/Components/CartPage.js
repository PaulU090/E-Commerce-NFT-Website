import React from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Select from "./Select";
import CartPageItemView from "./CartPageItemView";
import useUpdateCartItem from "../Hooks/useUpdateCart";
import useStripePayment from "../Hooks/useStripePayment";

import { CartContext } from "../../App";
import { useNavigate } from "react-router-dom";

import '../Styles/CartPageStyles.css'
import '../Styles/CartPageGrid.css'
import '../Styles/SiteFooterStyles.css'
import '../Styles/SingleProductPage.css'


export default function CartPage()
{
    const navigate = useNavigate();

    const {cart, setCart} = React.useContext(CartContext);
    const [updatingCartItem, setUpdatingCartItem, product, setProduct] = useUpdateCartItem();
    const [purchasing, setPurchasing] = useStripePayment();

    const GenerateCartList = ()=> {
        let arr = [];

        if(cart.cartItems.length <= 0)
        {
            arr.push(
                <div className="cart-grid-item"  key = {1}  style = {{ gridColumn: '1 / span 4'}}>
                    <div style = {{marginTop: "80px"}}  className="title-text">{"No items in cart"}</div>
                    
                    <div 
                        className="basic-text"
                        style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            marginTop: "5px",
                            marginBottom: "100px"
                        }}   
                        onClick={()=>{navigate('/shop')}} 
                    >{"Continue Shopping"}</div>
                </div>
            )
            return arr;
        }


        arr.push(
            <div className="cart-grid-item" key = {-4}>
                <div className="title-text">{"Product"}</div>
            </div>
        )

        arr.push(
            <div className="cart-grid-item" key = {-3}>
                <div className="title-text">{"QTY"}</div>
            </div>
        )

        arr.push(
            <div className="cart-grid-item" key = {-2}>
                <div className="title-text">{"Price"}</div>
            </div>
        )

        arr.push(
            <div className="cart-grid-item" key = {-1}>
                <div className="title-text">{"Total Price"}</div>
            </div>
        )

        let j = 0;
        for(let i = 0; i < cart.cartItems.length; i++)
        {
            arr.push(
                <div className="cart-grid-item" key = {i * 5}>
                    <CartPageItemView 
                        canRemove = {true}
                        product={cart.cartItems[i]}
                    />
                </div>
            )
            arr.push(
                <div className="cart-grid-item" key = {i * 5 + 1}>
                    <Select 
                        initialText = {`${cart.cartItems[i].cartquantity}`}
                        options={[
                            cart.cartItems[i].cartquantity - 1, 
                            cart.cartItems[i].cartquantity,
                            cart.cartItems[i].cartquantity + 1
                        ]}
                        style={{
                            width: '50px'
                        }}
                        onChangeSelection={(curr)=> {
                            let p = cart.cartItems[i];
                            p = {
                                ...p,
                                cartquantity: Number(curr)
                            }
                            console.log(p)
                            setProduct(p);
                            setUpdatingCartItem(true)
                        }}
                    />
                </div>
            )
            arr.push(
                <div className="cart-grid-item" key = {i * 5 + 2}>
                    <div className="title-text" style = {{margin: "5px"}}>{`$${cart.cartItems[i].productprice}`}</div>
                </div>
            )
            arr.push(
                <div className="cart-grid-item" key = {i * 5 + 3}>
                    <div className="title-text" style = {{margin: "5px"}}>{`$${cart.cartItems[i].cartquantity * cart.cartItems[i].productprice}`}</div>
                </div>
            )
            arr.push(
                <div className="cart-grid-item" key = {i * 5 + 4} style = {{gridColumn: '1 / span 4'}}>
                    <div 
                        style = {{alignSelf: 'start', width: '100%', left: '0%', height: '1px'}}
                        className="footer-divider-bar"
                    ></div>
                </div>
            )
            j++;
        }


        //j*5 + 5, 6, 7, etc
        arr.push(
           
            <div className="cart-shipping-options" key = {j*5 + 1}></div>
        )
        arr.push(
            <div className="cart-grid-item"  key = {j*5 + 2}>
                <div className="title-text"  style = {{margin: "5px"}}>{"Subtotal"}</div>
                <div className="title-text"  style = {{margin: "5px"}}>{"Sales Tax"}</div>
                <div className="title-text"  style = {{margin: "5px"}}>{"Shipping"}</div>
            </div>

        )

        let subtotal = cart.cartItems.reduce((accumulator, current)=> {
            return accumulator + Number(current.cartquantity) * Number(current.productprice);
        }, 0)
        

        const shipping = 0;
        const salesTax  = 0;/*subtotal * 0.08*/
        arr.push(
            <div className="cart-grid-item"  key = {j*5 + 3}>
                <div className="title-text" style = {{margin: "5px"}}>{`$${subtotal}`}</div>
                <div className="title-text"  style = {{margin: "5px"}}>{`$${salesTax}`}</div>
                <div className="title-text"  style = {{margin: "5px"}}>{`$${shipping}`}</div>
            </div>
        )

        arr.push(
            <div className="cart-grid-item" key = {j*5 + 4} style = {{gridColumn: '3 / span 2'}}>
                <div 
                    style = {{alignSelf: 'start', width: '100%', left: '0%', height: '1px'}}
                    className="footer-divider-bar"
                >
                </div>
            </div>
        )

        arr.push(
            <div className="cart-grid-item"  key = {j*5 + 5}  style = {{gridColumn: '3'}}>
                <div className="title-text"  style = {{margin: "5px"}}>{"Estimated Total"}</div>
              
            </div>

        )
        let total = Number(subtotal) + Math.floor( Number(salesTax).toPrecision(2)) + Number(shipping);
        arr.push(
            <div className="cart-grid-item"  key = {j*5 + 6}  style = {{gridColumn: '4'}}>
                <div className="title-text" style = {{margin: "5px"}}>{`$${total}`}</div>
            </div>
        )

        arr.push(
            <div className="cart-grid-item"  key = {j*5 + 7}  style = {{ gridColumn: '3 / span 2'}}>
                    <div  
                        style = {{width: '200px', marginTop: '20px'}}
                        className="submit-button"
                        onClick = {()=> {
                            setPurchasing(true);
                        }}    
                    >
                            {"Checkout"}
                    </div>
            </div>
        )

        arr.push(
            <div className="cart-grid-item"  key = {j*5 + 8}  style = {{ gridColumn: '3 / span 2'}}>
                <div 
                    className="basic-text"
                    style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        marginTop: "5px",
                        marginBottom: "100px"
                    }}   
                    onClick={()=>{navigate('/shop')}} 
                >{"Continue Shopping"}</div>
            </div>
        )

        return arr;
    }

    return(
        <div>
            <SiteHeader />
                <div className="cart-grid">
                    {GenerateCartList()}
                </div>
            <SiteFooter />
        </div>
    )
}