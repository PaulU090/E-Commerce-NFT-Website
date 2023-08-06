const db = require('./db/initTable.js')
require('dotenv').config();
const path = require('node:path')
const express= require('express');
const cors = require('cors');
const authenticationMiddleware = require('./middleware/authenticationMiddleware.js')
const app = express();
app.use(express.json())
app.use(cors())

//Import routers
const ProductsRouter = require('./routers/productQueries.js');
const AuthRouter = require('./routers/auth.js');
const CartRouter = require('./routers/cart.js');
const StripeRouter = require('./routers/APIRequests.js')
const OrderRouter = require('./routers/order.js')

//Use routers
app.use('/api/v1/products', ProductsRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/cart', authenticationMiddleware, CartRouter)
app.use('/api/v1/purchase', StripeRouter);
app.use('/api/v1/order', authenticationMiddleware, OrderRouter)

/*
app.use(express.static(path.join(__dirname, "../public")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "public", "index.html"));
});
*/



const port = process.env.SERVER_PORT || 3001;

const start = async ()=> {
    try{
        await db.InitTables();
    }
    catch(err)
    {
        throw err;
    }

    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}`)
    })
}
start();