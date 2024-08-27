const express = require('express');
const router = express.Router();
// const productController = require('../controllers/productController');
const {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct} = require('../controllers/productController');

router.get('/all-product', getAllProducts);
router.get('/product/:id', getProductById);
router.post('/create-product', createProduct);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

module.exports = router;
