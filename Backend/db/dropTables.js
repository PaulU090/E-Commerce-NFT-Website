const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

const DropTables = async()=> {
    const res = await pool.query('DROP TABLE IF EXISTS "cartItems", "orders";', [])
    console.log(res);
}

DropTables();