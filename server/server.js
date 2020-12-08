require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();


const bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// parse application/x-www-form-urlencoded - Implementación de middleware
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json -- Implementación de middleware
app.use(bodyParser.json())

// configuración lobal de rutas
app.use( require('./routes/index'));

mongoose.connect(process.env.URLDB, (err, res) => {
    if ( err ) throw err;
    console.log('Base de datos ONLINE'); 
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto:', process.env.PORT);
});