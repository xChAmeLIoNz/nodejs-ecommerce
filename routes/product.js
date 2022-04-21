const router = require('express').Router();
const path = require('path');
const Product = require('../models/Product.js');
const Cart = require('../models/Cart.js');
const User = require('../routes/auth');

//TODO
//Quando un utente clicca su "aggiugi al carrello" su un prodotto, quest'ultimo deve essere tolto dalla collezione products
//con method update

router.get('/productName/:name', async (req,res) => {
    const selectedProduct = await Product.findOne({title: req.params.name});
    if(!selectedProduct) {
        res.status(400).json("Product not found");
    }
    const count = req.body.count;
    const quantità = selectedProduct.quantity;

    if(count > quantità) {
        res.status(400).json("We don't have enough of that!");
    }else if (count <= quantità) {
        const updatedQuantity = (quantità - count);
        const newCart = new Cart(
            {
                username: "user",
                products: [
                    {
                        productName: selectedProduct.title,
                        quantity: count
                    }
                ]                                
            }
        );
        const savedCart = await newCart.save();
        const updatedProduct = await selectedProduct.update({quantity: updatedQuantity}); 
        //METHOD UPDATE IS DEPRECATED, USE updateOne or updateMany instead
    
        res.status(200).json("Item/s added to cart!");
    }
    

    
})

module.exports = router;

