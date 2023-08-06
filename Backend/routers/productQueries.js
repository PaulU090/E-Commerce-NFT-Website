const express = require('express')
const {
    CreateProduct,
    GetProducts,
    GetProductById,
    UpdateProduct,
    DeleteProduct
} = require('../controllers/productQueries.js');

const router = express.Router();

router.route('/').post(CreateProduct).get(GetProducts);
router.route('/:id').get(GetProductById).patch(UpdateProduct).delete(DeleteProduct);

module.exports = router;