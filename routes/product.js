const router = require('express').Router();
const path = require('path');
const Product = require('../models/Product.js');
const Cart = require('../models/Cart.js');
const User = require('../routes/auth');

//AGGIUNTA AL CARRELLO
router.post('/productName/:name', async (req,res) => {

    if(!req.session.username) {
        return res.status(400).sendFile(path.join(__dirname, '../html', '/non-logged.html'));
    }

    const selectedProduct = await Product.findOne({title: req.params.name});
    if(!selectedProduct) { 
        res.status(400).json("Product not found");
    }

    const count = req.body.count;
    const quantita = selectedProduct.quantity;

    const _count = count ? count : 1;

    if(_count > quantita) {
        res.status(400).sendFile(path.join(__dirname, '../html', '/out-stock.html'));
    }else if (_count <= quantita) {

        if(selectedProduct.title === 'cavo-HDMI') {
            const newCart = new Cart(
                {
                    username: req.session.username,
                    products: [
                        {
                            productName: selectedProduct.title,
                            quantity: _count
                        }
                    ]                                
                }
            
            );
    
            const savedCart = await newCart.save();
            return res.status(200).sendFile(path.join(__dirname, '../html', '/cart.html'));
        }

        const updatedQuantity = (quantita - _count);

        const newCart = new Cart(
            {
                username: req.session.username,
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
    
        res.status(200).sendFile(path.join(__dirname, '../html', '/cart.html'));
    }
      
});

router.get('/merce', (req,res) => {
    if(!req.session.username) {
        return res.redirect('/user/login');
    }
    res.status(200).sendFile(path.join(__dirname, '../html', '/merce.html'));

})

module.exports = router;

