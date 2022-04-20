const router = require('express').Router();
const path = require('path');


//GET request to 'root' for index.html
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../src', '/index.html' ));
});

router.get('/user/login', (req,res) => {
    res.sendFile(path.join(__dirname, '../src', '/login.html'));
});

router.get('/user/register', (req,res) => {
    res.sendFile(path.join(__dirname, '../src', '/register.html'));
})


router.get('/lavatrici', async (req,res) => {
    const lavatrici = await product.findOne({title: "lavatrici"});
    res.json(lavatrici.quantin)
})

module.exports = router;