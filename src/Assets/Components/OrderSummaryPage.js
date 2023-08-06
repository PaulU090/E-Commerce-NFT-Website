import React from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Select from "./Select";
import CartPageItemView from "./CartPageItemView";
//Hooks
import useUpdateCartItem from "../Hooks/useUpdateCart";
import useStripePayment from "../Hooks/useStripePayment";
import useGetOrders from "../Hooks/useGetOrders"

import { OrdersContext } from "../../App";
import { useNavigate } from "react-router-dom";

import '../Styles/CartPageStyles.css'
import '../Styles/CartPageGrid.css'
import '../Styles/SiteFooterStyles.css'
import '../Styles/SingleProductPage.css'


export default function CartPage()
{
    const navigate = useNavigate();

    const  [fetchingOrders, setFetchingOrders] = useGetOrders();
    const {orders, setOrders} = React.useContext(OrdersContext)
    
    React.useEffect(()=>{
        if(orders.requiresUpdate)
        {
            setFetchingOrders(true);
        }
    }, [orders, fetchingOrders])

    const GenerateOrderHeaders = ()=> {
        let arr = [];
        arr.push(
            <div className="cart-grid-item"  style = {{marginBottom: '10px'}}  key = {-4}>
                <div className="title-text">{"Product"}</div>
            </div>
        )

        arr.push(
            <div className="cart-grid-item" style = {{marginBottom: '10px'}}  key = {-3}>
                <div className="title-text">{"QTY"}</div>
            </div>
        )

        arr.push(
            <div className="cart-grid-item" style = {{marginBottom: '10px'}}  key = {-2}>
                <div className="title-text">{"Price"}</div>
            </div>
        )

        arr.push(
            <div className="cart-grid-item" style = {{marginBottom: '10px'}}  key = {-1}>
                <div className="title-text">{"Total Price"}</div>
            </div>
        )
        return arr;
    }

    const GenerateOrderList = ()=> {
        let arr = [];

        if(!orders.orders[0])
        {
            return arr;
        }

        arr = GenerateOrderHeaders()
        let j = 0;
        for(let i = 0; i < orders.orders[0].values.length; i++)
        {
            arr.push(
                <div className="cart-grid-item"  key = {i * 5} style = {{gridColumn: '1 / span 4'}}>
                    <div 
                        style = {{alignSelf: 'start', width: '100%', left: '0%', height: '1px'}}
                        className="footer-divider-bar"
                    ></div>
                </div>
            )

            arr.push(
                <div className="cart-grid-item" key = {i * 5 + 1}>
                    <CartPageItemView 
                        canRemove = {false}
                        product={orders.orders[0].values[i].product}
                    />
                </div>
            )

            arr.push(
                <div className="cart-grid-item" key = {i * 5 + 2}>
                <div className="title-text">
                    {orders.orders[0].values[i].cartquantity}
                </div>
            </div>
            )

            arr.push(
                <div className="cart-grid-item" key = {i * 5 + 3}>
                <div className="title-text">
                    {`$${orders.orders[0].values[i].product.productprice}`}
                </div>
            </div>
            )

            arr.push(
                <div className="cart-grid-item" key = {i * 5 + 4}>
                <div className="title-text">
                    {`$${Number( orders.orders[0].values[i].product.productprice) * Number(orders.orders[0].values[i].cartquantity)}`}
                </div>
            </div>
            )
            j++;
        }

        arr.push(
            <div className="cart-grid-item" style = {{fontSize: '1.25rem' , marginTop: '30px', gridColumn: 'span 4'}} key = {j * 5 + 1}>
            <div className="title-text">
                {`Order ID: ${orders.orders[0].orderid}`}
            </div>
            <div className="title-text">
                {`Order Total: $${orders.orders[0].values.reduce((accumulator, current) => {
                    return accumulator +  Number(current.cartquantity) * Number(current.product.productprice)   
                }, 0)}`}
            </div>
        </div>
        )
        return arr;
    }

    return(
        <div>
            <SiteHeader />
                <div className="cart-grid">
                    {GenerateOrderList()}
                </div>
            <SiteFooter />
        </div>
    )
}