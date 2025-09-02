//This file (productRoutes.js) connects endpoints (URLs) to your controller functions.
//This is where we create the endpoint 

const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productControllers');

const router = express.Router();

// Middleware to parse JSON
router.use(express.json());

router.use(express.urlencoded({extended:true}));

router.post('/createproduct', createProduct);
router.get('/getproduct', getProducts);
router.put('/updateproduct/:id', updateProduct);
router.delete('/deleteproduct', deleteProduct);

module.exports = router;


