require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();


const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded - Implementación de middleware
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json -- Implementación de middleware
app.use(bodyParser.json())

app.use( require('./routes/route'))

mongoose.connect(process.env.URLDB, (err, res) => {
    if ( err ) throw err;
    console.log('Base de datos ONLINE'); 
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto:', process.env.PORT);
});