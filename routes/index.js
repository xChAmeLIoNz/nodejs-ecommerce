const router = require('express').Router();
const path = require('path');


//GET request to 'root' for index.html
router.get('/', (req,res) => {
    if(!req.session.username) {
        return res.sendFile(path.join(__dirname, '../html', '/index.html' ));
    }
    res.sendFile(path.join(__dirname, '../html', '/logged-home.html' ));
});

router.get('/user/login', (req,res) => {
    if(!req.session.username) {
        return res.sendFile(path.join(__dirname, '../html', '/login.html' ));
    }
    res.sendFile(path.join(__dirname, '../html', '/logged-home.html' ));
});

router.get('/user/register', (req,res) => {
    if(!req.session.username) {
        return res.sendFile(path.join(__dirname, '../html', '/register.html' ));
    }
    res.sendFile(path.join(__dirname, '../html', '/logged-home.html'));
})

/*
router.get('/lavatrici', async (req,res) => {
    const lavatrici = await product.findOne({title: "lavatrici"});
    res.json(lavatrici.quantin)
})
*/

module.exports = router;