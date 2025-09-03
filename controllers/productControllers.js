const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('../models/productModels');
// const Product = require('../models/ProductModel');


// Create a Product
const createProduct = async(req,res) =>{
    try{
        const {name,quantity,price,image}= req.body;
        const existingProduct = await Product.findOne({name});
        if(existingProduct){
            console.log("Product already exists");
            res.status(500).json(existingProduct);
        }else{
            const newProduct = await Product.create({name,quantity,price,image});
            res.status(200).json(newProduct);
            console.log('Product created successfully',newProduct);
        }
        
    }
    catch(err){
        res.status(500).json({error:err.message});
        console.log('Product unsuccessful', err);
    }
}

// get all products
const getProducts = async (req,res) => {
    try {
        const product = await Product.find()
        console.log('Fetched product', product)
        res.status(200).json(product)

    } catch (error) {
        console.log("error getting products", error);
        res.status(500).json({message: error.message});
    }
}


// /Find Single Product by ID
const findProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        console.log("Product not found");
        return res.status(404).json({ error: "Product not found" });
      } else {
        console.log("Product found");
        res.status(200).json(product);
      }
    } catch (error) {
      console.log("Error finding product", error);
      res.status(500).json({ error: error.message });
    }
  };


  // update a product
const updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body);
      if (!product){
        console.log('Product not found');
        res.status(404).json({ error:error.message});
      }else{
        console.log("Product updated successfully");
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(500).json({error: error.message});
      console.log("Failed to update product",error);
    }
  }
  

  // Delete a Product
  const deleteProduct = async (req,res)=> {
    try{
      const product= await Product.findByIdAndDelete(req.params.id , req.body);
      if(!product){
        console.log("Product not found");
        res.status(404).json({error: error.message});
      }else{
        console.log("Product deleted successfully");
        res.status(200).json(product);
      }
    }catch(error){
      res.status(500).json({error: error.message});
      console.log("Failed to delete product",error);
    }
  }

 


module.exports={
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    findProduct

}




// This file defines CRUD operations for your Product model:

// createProduct → Create new product.

// getProducts → Get all products.

// findProduct → Get a single product by ID.

// updateProduct → Update product by ID.

// deleteProduct → Delete product by ID.