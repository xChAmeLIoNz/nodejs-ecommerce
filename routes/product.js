const router = require('express').Router();
const path = require('path');
const Product = require('../models/Product.js');
const Cart = require('../models/Cart.js');
const User = require('../routes/auth');



//AGGIUNTA AL CARRELLO
router.get('/productName/:name', async (req,res) => {

    const selectedProduct = await Product.findOne({title: req.params.name});
    if(!selectedProduct) { 
        res.status(400).json("Product not found");
    }

    const count = req.body.count;
    const quantita = selectedProduct.quantity;

    const _count = count ? count : 1;

    if(_count > quantita) {
        res.status(400).json("We don't have enough of that!");
        console.log("here3")

    }else if (_count <= quantita) {
        const updatedQuantity = (quantita - _count);
        const newCart = new Cart(
            {
                username: "utente",
                products: [
                    {
                        productName: selectedProduct.title,
                        quantity: _count
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

