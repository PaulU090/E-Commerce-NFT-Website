const express = require('express')
const router = express.Router();

const {
    GetOrders,
    CreateOrder,
    DeleteOrder
} = require('../controllers/order.js')

router.route('/').get(GetOrders).post(CreateOrder);
router.route('/:id').delete(DeleteOrder);

module.exports = router;