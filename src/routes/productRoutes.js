const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/all-product', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.post('/create-product', productController.createProduct);
router.put('/update-product/:id', productController.updateProduct);
router.delete('/delete-product/:id', productController.deleteProduct);

module.exports = router;
