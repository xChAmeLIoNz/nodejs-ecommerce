const router = require('express').Router();
const path = require('path');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
//const bodyParser = require('body-parser');
//router.use(bodyParser.json());

const isAuth = (req,res,next) =>{
    if(req.session.isAuth) {
        next()
    }else {
        res.redirect('/user/login');
    }
}

//REGISTER
router.post('/register', async (req,res) => {
    if(req.session.username) {
        return res.status(200).sendFile(path.join(__dirname, '../html', '/logged-home.html'));
    }
    const newUser = new User ({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS).toString()
    });
    
    try {
        const savedUser = await newUser.save();
        res.status(200).sendFile(path.join(__dirname, '../html', '/index.html'));
    } catch (err) {
        //se l'username esiste già nel db, viene mandata una pagina di errore
        const controllo = await User.findOne({username:req.body.username});
        if (controllo.username == req.body.username) {
            res.status(400).sendFile(path.join(__dirname, '../html', '/errore.html'));
            return;
        } 
        res.status(500).json(err);
         
    }

});

//LOGIN
router.post('/login', async (req,res) => {
    if(req.session.username) {
        return res.status(200).sendFile(path.join(__dirname, '../html', '/logged-home.html'));
    }
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) {
            res.status(400).sendFile(path.join(__dirname, '../html', '/errore.html'));
        }
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SEC_PASS);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(originalPassword !== req.body.password) {
            return res.status(400).sendFile(path.join(__dirname, '../html', '/errore.html'));
        } 
        
        //const { password, ...others} = user; 
        //se provo a stampare il json con l'oggetto user (senza pswd, quindi "...others") non funziona, output = {}
        //return res.status(200).json(...others); //2:13 AM FUNZIONA CAZZO
        
        req.session.username = user.username;
        res.status(200).sendFile(path.join(__dirname, '../html', '/logged-home.html'));

    } catch (error) {
        res.status(500).json(error);                
    }
});

//LOGOUT
router.get('/logout', (req,res) => {
    if(!req.session.username) {
        return res.status(400).sendFile(path.join(__dirname, '../html', '/non-logged.html'));
    }
    req.session.destroy();
    res.sendFile(path.join(__dirname, '../html', '/logout.html'));
});

module.exports = router;