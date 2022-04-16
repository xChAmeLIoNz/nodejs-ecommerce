const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const CryptoJs = require('crypto-js');
const dotenv = require('dotenv');
const userRoute = require('./routes/auth.js');
const indexRoute = require('./routes/index.js');

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: true}));
//app.use(express.json) //parse json inside http body requests //express 4.16> includes this by default
//app.use(express.urlencoded({ extended: true }));


//database connection
mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected!'))
.catch((err) => {
    console.log(err);
});

const User = mongoose.model('User', {username: String, password: String});

//route to login
app.use('/user', userRoute);

app.use('/', indexRoute);


app.listen(PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


