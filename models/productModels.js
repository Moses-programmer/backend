// schema determines structure of data
const mongoose = require('mongoose');

// Define Schema (structure of the collection)
const productSchema =  new mongoose.Schema({
    name:{
        type:String
    },
     quantity:{
         type:Number
     },
    price:{
         type:Number
    },
    image:{
        type: String,
        
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
}

)

// Create Model (links schema with MongoDB collection `products`)
const Product = mongoose.model('Product', productSchema); 

module.exports = Product;