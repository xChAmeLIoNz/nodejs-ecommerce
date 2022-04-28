const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const userRoute = require('./routes/auth.js');
const indexRoute = require('./routes/index.js');
const productRoute = require('./routes/product.js');

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


//route to login

app.use('/static', express.static(path.join(__dirname, 'html', 'assets')));

app.use('/', indexRoute);
app.use('/api', userRoute);
app.use('/products', productRoute);




app.listen(PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


