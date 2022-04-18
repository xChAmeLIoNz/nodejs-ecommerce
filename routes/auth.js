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
        const user = await User.findOne({username: req.body.username});
        if(!user) {
            res.status(400).json('Wrong USER credentials!');
        }
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SEC_PASS);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);//debug: fino a qua la psw viene decriptata correttamente (issue: IF ?)
        console.log(originalPassword);
        if(originalPassword !== req.body.password) {
            return res.status(400).json('Wrong PASSWORD credentials!');
        }
        //U2FsdGVkX1+fwDANJral6p79qxV1o607DTXmZKRvBuw=  
        
        const { password, ...others} = user._doc;
        return res.status(200).json(user);

    } catch (error) {
        res.status(500).json(error);                
    }
})

module.exports = router;