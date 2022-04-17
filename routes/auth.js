const router = require('express').Router();
const path = require('path');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
//const bodyParser = require('body-parser');

//router.use(bodyParser.json());

//REGISTER
router.post('/register', async (req,res) => {
    const newUser = new User ({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.username, process.env.SEC_PASS).toString()
    });
    
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }

});

//LOGIN
router.post('/login', async (req,res) => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;