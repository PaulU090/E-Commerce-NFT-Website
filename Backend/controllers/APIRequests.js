const express = require('express')
const request = require('request')
const jwt = require('jsonwebtoken');
//const {StatusCodes} = require('http-status-codes')
require('dotenv').config();
const {CheckForUserid} = require('./auth')

const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})


const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


const StripePurchase = async (req, res)=>{  
    var API_Response = {
        error: '',
        payload: {}
    };

    const items = req.body.items;
    if(!items)
    {
        return res.status(400).send('No items found in request body.');
    }
    
    try{
        //Get the user from the json web token passed in the headers
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer '))
        {
            throw new Error('Invalid Authentication');
        }

        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = {
            userId: payload.userId,
            name: payload.name
        }

        //Use that userid to create a stripe customer
        const customer = await stripe.customers.create({
            metadata: {
                userId: user.userId
            }
        })

        //Create the stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items.map(item =>{
                return({
                    price_data:{
                        currency: 'usd',
                        product_data: {
                            name: item.productname,
                        
                        },
                        unit_amount: Number(item.productprice) * 100 //needs to be in pennies for stripe to function
                    },
                    quantity: Number(item.cartquantity)  //hardcoded value for quantity for testing  
                })
            }),
            
            success_url: `${process.env.SERVER_URL}ordersummary`, //success pagge for completing order
            cancel_url: `${process.env.SERVER_URL}cart`,  //page when we go back / exit checkout
            customer: customer.id
            });
        return res.status(200).json(session)

    }catch(err)
    {
        API_Response = {
            error: err.message,
            payload: {}
        }
        return res.status(400).json(API_Response); 
    }
       
}


const StripePurchaseSucceededWebhook = async(req, res)=> {
    const event = req.body;


    switch(event.type){
        case 'payment_intent.succeeded': {
            ProcessSuccessfulPayment(event);
            return res.status(200).send('Payment processed successfully.')
        }
        default: {
            return res.status(400).send('Something went wrong with processing the webhook.')
        }
    }

}

const ProcessSuccessfulPayment = async(event)=> {
    const customer = await stripe.customers.retrieve(
        event['data']['object']['customer']
      );
    const userid = customer.metadata.userId;
    
    try {
        const items = await pool.query(
            `SELECT * FROM "cartItems"
            RIGHT JOIN products
                ON productId = cartProductId
            WHERE cartUserId = $1 AND orderCompleted = $2`, 
            [userid, false]);
        let cartItems = items.rows.map(item => { 
            return( {cartentryid: item.cartentryid})
        })
        let res = await CreateOrder(userid, cartItems);
    }
    catch(err)
    {
        throw err;
    }   
}

const CreateOrder = async(userId, cartItems)=> {    
    //Get the UUIDs for our cart items
    let uuids = cartItems.map( item=> item.cartentryid)
    try{
        const results = await pool.query(
            `INSERT into "orders" (
                orderCartItemIds,
	            orderUserId
            )
            VALUES (
                $1,
                $2
            )
            RETURNING *`,
            [
                uuids,
                userId
            ]
        )        
        //Update the cart item status
        const cartUpdateResults = await pool.query(
            `UPDATE "cartItems" SET
                orderCompleted = $1
            WHERE cartEntryId = ANY($2) AND cartUserId = $3
            RETURNING *`,
            [
                true,
                uuids,
                userId
            ]
            )
      
        return results.rows[0].orderid
    }
    catch(err)
    {
        throw err;
    }
}


module.exports = {
    StripePurchase,
    StripePurchaseSucceededWebhook
}