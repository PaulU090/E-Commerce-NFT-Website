const express = require('express');
const router = express.Router();

const {
    Login,
    Register,
    CreateTempUser
} = require('../controllers/auth.js');

router.post('/register', Register);
router.post('/login', Login);
router.post('/tempUser', CreateTempUser);

module.exports = router;