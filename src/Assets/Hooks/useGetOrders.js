import React from "react";
import { OrdersContext } from "../../App";

export default function useGetOrders()
{
    const[fetchingOrders, setFetchingOrders] = React.useState(true);
    const {orders, setOrders} = React.useContext(OrdersContext)

    React.useEffect(()=>{    
        const fetchData = async()=> {
            try
            {
                const data = await fetch('../api/v1/order', 
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                    
                })
                const json = await data.json();
                return json;
            }
            catch(err)
            {
                console.log(err);
                throw err;
            }
        }        
        if(fetchingOrders || orders.requiresUpdate)
        {
            let json = fetchData()
            .then(res => {
                const{payload} = res;
                let orderField = payload.map(item=>({
                        orderid: item.orderid,
                        values: item.values
                    })
                )

                let newOrders = {
                    orders: orderField,
                    lastUpdated: Date.now(),
                    requiresUpdate: false
                }
                setOrders(prev => {return (newOrders)})
            })
            .then(()=> {
                setFetchingOrders(false);
            })
        }
    }, [fetchingOrders])

    return [fetchingOrders, setFetchingOrders];
}