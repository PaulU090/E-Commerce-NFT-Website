const Pool = require('pg').Pool;
require('dotenv').config();
const fs = require('fs');

const {InitTables} = require('./initTable.js');
const path = require('path');
const directoryName = path.resolve(__dirname, '../../public/Images/BoredApes/');

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

const GetProductByUrl = async (url)=>{
    try{
        const results = await pool.query('SELECT * FROM products WHERE productImageUrl = $1', [url]) 
        return results.rows.length;
    }
    catch(err){
        throw err;
    }
}

const LoadTables = async(dir)=>{
    let arr =fs.readdirSync(dir, {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .map(item =>  `Images/BoredApes/${item.name}`);
    for(let i = 0; i< arr.length; i++)
    {
        try{
            await LoadOne(arr[i], i)
        }
        catch(err){
            throw err;
        }
    }
    
}

const LoadOne = async(url, index) =>{
    let basePrice = Math.floor((Math.random() + 1) * 350);
    const sellers = [
        'Ape Industries', 'Apechella', 'GuccApe'
    ]
    let item = {
        productName : `Bored Ape #${index+1}`,
        productSeller: sellers[Math.min( Math.floor(Math.random() * sellers.length, sellers.length - 1) )],
        productImageUrl : url,
        productPrice : `${basePrice}`,
        productQuantityAvailable: `${Math.floor((Math.random() + 1) * 15)}`,
        productDescription: "This NFT is a must have for anyone looking to grow their collection! The whole image is clear and crisp, and has a new sheen of consummate boredom that really gives this ape a big boost.",
        productIsOnSale: `${Math.round(Math.random()) === 0 ? 'false': 'true'}`,
        productSalePrice: `${basePrice - Math.floor((Math.random() + 1) * 170)}`
    } 

    const {
        productName, 
        productSeller,
        productImageUrl, 
        productPrice, 
        productQuantityAvailable, 
        productDescription, 
        productIsOnSale, 
        productSalePrice
    } = item; 

    try{
        const exists = await GetProductByUrl(productImageUrl) != 0;
        if(exists)
        {
            console.log('Entry with URL already exists.');
            return;
        }
        const results = await pool.query(
            `INSERT INTO products (
                productName, 
                productImageUrl, 
                productPrice, 
                productQuantityAvailable, 
                productDescription, 
                productIsOnSale, 
                productSalePrice,
                productSeller
            )
            VALUES (
                $1, 
                $2, 
                $3, 
                $4, 
                $5, 
                $6, 
                $7,
                $8
            ) RETURNING *`,
            [        
                productName, 
                productImageUrl, 
                productPrice, 
                productQuantityAvailable, 
                productDescription, 
                productIsOnSale, 
                productSalePrice,
                productSeller
            ]);
        console.log(`Product added with id: ${results.rows[0].productid}`);
    }
    catch(err)
    {
        console.log(err);
    }
}

InitTables();
LoadTables(directoryName);