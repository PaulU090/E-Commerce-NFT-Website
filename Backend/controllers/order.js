require('dotenv').config();

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})



const GetOrders = async(req, res)=> {
    const {
        userId,
        name
    } = req.user;

    if(!req.user)
    {
        throw new Error('Unauthenticated');
    }

    try {
        let items = await pool.query(
            `SELECT * FROM "orders"
            RIGHT JOIN "cartItems"
                ON cartEntryId = ANY(orderCartItemIds)
                RIGHT JOIN products
                    ON productId = cartProductId
            WHERE orderUserId = $1
            ORDER BY createdAt DESC`, 
            [userId]);
        let arr = items.rows.map(item=> mapOrder(item))
        let result = eliminateDuplicates(arr);
        res.status(200).json({
            payload : result, 
            count: items.rows.length
        })
    }
    catch(err)
    {
        throw err;
    }   
}

const eliminateDuplicates = (array)=> {
    var output = [];

    array.forEach(function(item) {
    var existing = output.filter(function(v, i) {
        return v.orderid == item.orderid;
    });
    if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        
        item.values.forEach(itemVal => {
            output[existingIndex].values.push(itemVal);
        })
        
    } else {
        output.push(item);
    }
    });

    return output
}

const mapOrder = (item)=> {
    let value = {
        cartquantity: item.cartquantity,
        product : { 
            productid: item.productid,
            productname: item.productname,
            productseller: item.productseller,
            productimageurl: item.productimageurl,
            productprice: item.productprice,
            productisonsale: item.productisonsale,
            productsaleprice: item.productsaleprice,
            productquantityavailable : item.productquantityavailable, 
            productdescription : item.productdescription, 
        }
    }

    let res = {
        orderid: item.orderid,
        values: [value]
    }

    return res;
}


const CreateOrder = async(req, res)=> {
    //We should have an array of cart items
    const {
        cartItems
    } = req.body;
    //Get the user
    const {userId} = req.user;
    
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
        console.log(`Order created with id: ${results.rows[0].orderid}`)

        
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
      
        res.status(200).json({msg: `Cart entry created with id: ${results.rows[0].orderid}`})
    }
    catch(err)
    {
        throw err;
    }
}


const DeleteOrder = async(req, res)=> {
    const {userId} = req.user;
    const orderId = req.params.id;
    try{
        const results = await pool.query(
            `DELETE FROM "orders" 
            WHERE orderId = $1 AND orderUserId = $2
            RETURNING *`,
            [
                orderId,
                userId
            ]
            )
        return res.status(200).json({
            msg: `Deleted entry with id: ${orderId}`
        })
    }
    catch(err)
    {
        throw err;
    }

}

module.exports = {
    GetOrders,
    CreateOrder,
    DeleteOrder
}