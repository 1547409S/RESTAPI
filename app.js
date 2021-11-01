const express = require('express');
const app = express();
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

//MONGODB password = deep2san
//Password can be aded in environment variable and add code below 
//e.g. process.env.MONGO_ATLAS_PWD. Password needs to set in system environment variable
mongoose.connect('mongodb+srv://node-rest-shop:deep2san@node-rest-shop.6ldbl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//CORS setting - for access management between client and server
//Add this standard block to handle browser securty settings.
//Postman client doesn't check these securities; so no CORS error 
//but browsers will check and client may encounter CORS without below settings.
//add * to allow all server access. Else put specific domain (example.com) to restrict the access.
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It surely works!'
//     });
// });

//routes to handle the requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

//if not found above routes then default route to handle error
app.use((req, res, next) => {
    const error = new Error('Check out the request url:' + req.body.name);
    error.status =404;
    next(error);
});

//handling all other errors captured any where in the program
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;