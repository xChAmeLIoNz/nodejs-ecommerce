//DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport-local');

//ROUTES
const userRoute = require('./routes/auth.js');
const indexRoute = require('./routes/index.js');
const productRoute = require('./routes/product.js');

dotenv.config();

const PORT = process.env.PORT;

//creates the server app
const app = express();

//JSON PARSING
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: true}));
//app.use(express.json) //parse json inside http body requests //express 4.16> includes this by default
//app.use(express.urlencoded({ extended: true }));

const MONGO_URL = process.env.MONGO_URL;

//database connection
mongoose
.connect(MONGO_URL)
.then(() => console.log('Database connected!'))
.catch((err) => {
    console.log(err);
});


//const client = mongoose.connection.getClient();

//CREATES A SESSION FOR LOGGED USER
app.use(session({
    secret: 'secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24
    },
    store: new MongoStore({
        mongoUrl: MONGO_URL
    })
}));



//this way html pages can access static content like .css/.js and images
app.use('/static', express.static(path.join(__dirname, 'html', 'assets')));

app.use('/', indexRoute);
app.use('/api', userRoute);
app.use('/products', productRoute);




app.listen(PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


