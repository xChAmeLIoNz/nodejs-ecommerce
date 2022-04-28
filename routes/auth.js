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
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS).toString()
    });
    
    try {
        const savedUser = await newUser.save();
        res.status(200).sendFile(path.join(__dirname, '../html/templates', '/index.html'));
    } catch (err) {
        //se l'username esiste già nel db, viene mandata una pagina di errore
        const controllo = await User.findOne({username:req.body.username});
        if (controllo.username == req.body.username) {
            res.status(400).sendFile(path.join(__dirname, '../html/templates', '/errore.html'));
            return;
        } 
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
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(originalPassword !== req.body.password) {
            return res.status(400).json('Wrong PASSWORD credentials!');
        } 
        
        //const { password, ...others} = user; 
        //se provo a stampare il json con l'oggetto user (senza pswd, quindi "...others") non funziona, output = {}
        //return res.status(200).json(...others); //2:13 AM FUNZIONA CAZZO

        res.status(200).sendFile(path.join(__dirname, '../html/merce', '/merce.html'));
    } catch (error) {
        res.status(500).json(error);                
    }
})

module.exports = router;