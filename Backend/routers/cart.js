const express = require('express')
const router = express.Router();

const {
    GetCartItems,
    GetSingleCartItem,
    PostCartItem,
    UpdateCartItem,
    DeleteCartItem
} = require('../controllers/cart.js')

router.route('/').get(GetCartItems).post(PostCartItem);
router.route('/:id').get(GetSingleCartItem).patch(UpdateCartItem).delete(DeleteCartItem);


module.exports = router;