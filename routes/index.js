const router = require('express').Router();
const path = require('path');


//GET request to 'root' for index.html
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../src', '/index.html' ));
});

//TODO

//GET request to '' for register.html

//GET request to '' for login.html



module.exports = router;