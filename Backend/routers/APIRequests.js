const express = require('express');
const {
    StripePurchase,
    StripePurchaseSucceededWebhook
} = require('../controllers/APIRequests.js')

const router = express.Router();

router.route('/').post(StripePurchase);
router.route('/webhooks').post(StripePurchaseSucceededWebhook);


module.exports = router;