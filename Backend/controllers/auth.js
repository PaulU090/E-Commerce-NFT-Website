const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes')
require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})


const Login = async(req, res)=> {
    const {userEmail, userPassword} = req.body;

    if(!userEmail || !userPassword)
    {
        throw new Error('Please provide an email and password');
    }
    const user = await CheckForEmail(userEmail);
    if(!user)
    {
        throw new Error(`No user found with email ${userEmail}`);
    }

    const match = await bcrypt.compare(userPassword, user.userpassword);
    if(!match)
    {
        return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Password');
    }

    const token = await CreateJWT(user);
    user.token = token;
    res.status(200).json(user);

}


const Register = async(req, res)=> {
    const {
        userEmail, 
        userName, 
        userPassword
    } = req.body;

    if(!userEmail || !userName || !userPassword)
    {
        throw new Error("Please provide a username, email, and password");
    }


    let validEmail = true;
    if( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail))
    {
        validEmail = true;
    }
    else{
        validEmail = false;
    }

    if(!validEmail)
    {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Please provide a valid email"});
    }
    
    let user  = await CheckForEmail(userEmail);
    if(user)
    {
        throw new Error(`User already exists with email ${userEmail}`);
    }

    //Generate the salt and hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    try{
        const result = await pool.query(`INSERT INTO users (
            userName,
            userPassword,
            userEmail,
            userIsTempUser
        )
        VALUES (
            $1,
            $2,
            $3,
            $4
        ) RETURNING *`,
        [userName, hashedPassword, userEmail, false])

        user = result.rows[0];
        const token = await CreateJWT(user);
        user.token = token;
        res.status(200).json(user);
    }
    catch(err)
    {
        throw err;
    }    
}

const CreateTempUser = async(req, res)=>{
    const tempBody = {
        userEmail: "temp",
        userName: "temp",
        userPassword: "temp"
    }
    
    const {
        userEmail, 
        userName, 
        userPassword
    } = tempBody;

    if(!userEmail || !userName || !userPassword)
    {
        throw new Error("Something went wrong.");
    }

    //Generate the salt and hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    try{
        const result = await pool.query(`INSERT INTO users (
            userName,
            userPassword,
            userEmail,
            userIsTempUser
        )
        VALUES (
            $1,
            $2,
            $3,
            $4
        ) RETURNING *`,
        [userName, hashedPassword, userEmail, true])

        user = result.rows[0];
        const token = await CreateJWT(user);
        user.token = token;
        res.status(200).json(user);
    }
    catch(err)
    {
        throw err;
    }    
}

//Checks for existing email in database
const CheckForEmail = async(email) =>
{
    try{
        const {rows} = await pool.query(
            `SELECT * FROM users WHERE userEmail = $1`,
            [email]
        )
        const user = rows[0];
        if(!user)
        {
            return null;
        }
        
        return user;
    }
    catch(err)
    {
        throw err;
    }
}

const CheckForUserid = async(userid) => 
{
    try{
        const {rows} = await pool.query(
            `SELECT * FROM users WHERE userId = $1`,
            [userid]
        )
        const user = rows[0];
        if(!user)
        {
            return null;
        }
        
        return user;
    }
    catch(err)
    {
        throw err;
    }
}

module.exports = {
    Login,
    Register,
    CreateTempUser,
    CheckForUserid
}

const CreateJWT = async (user) => {
    return jwt.sign({
        userId: user.userid,
        name: user.username
    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_LIFETIME
    }
    )
}