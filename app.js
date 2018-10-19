const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const loginRoutes = require('./api/routes/login');

mongoose.connect('mongodb://mib47225:mibdream2013@mappie-db-shard-00-00-pvyl0.mongodb.net:27017,mappie-db-shard-00-01-pvyl0.mongodb.net:27017,mappie-db-shard-00-02-pvyl0.mongodb.net:27017/mappie?ssl=true&replicaSet=Mappie-DB-shard-0&authSource=admin&retryWrites=true'
);

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

app.use('/user', loginRoutes);

app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;

// Use Heroku and mongodb to deploy(mongolab)