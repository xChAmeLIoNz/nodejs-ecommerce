const router = require('express').Router();
const path = require('path');
const { User } = require('../server');

router.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, '../src', '/login.html'));
});

//autenticazione dell'utente
router.post('/login', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const users = await User.find({username, password});
        //controllo dei dati
    if(users.length > 0) {
        res.sendFile(path.join(__dirname, '../src', '/merce.html'));
    }else {
        res.sendFile(path.join(__dirname, '../src', '/errore.html'));
    }
    } catch(e) {
        console.log(e);
    }
    

    
});

module.exports = router;