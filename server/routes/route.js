const express = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const app = express();

app.get('/usuario', function (req, res) {
    res.json('get Usuario');
});

app.post('/usuario', function (req, res) {
    let body = req.body;

    //creamos el schema usuario con los datos que vienen del request
    let usuario = new Usuario({
        nombre : body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password , 10), // Se encripta el password del usuario con bcrypt 
        role : body.role
    });

    // almacenamos el usuario en la base de datos, gestionamos los errores
    usuario.save((err, usuarioDB) => {
        if ( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario : usuarioDB
        });
    })
    
});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate (id , (err, usuarioDB)=> {

    })
    res.json({
        id
    });
});

app.delete('/usuario', function (req, res) {
    res.json('delete Usuario');
});

app.get('/usuarios', function (req, res) {
    Usuario.find().lean().exec(function(err, usuarios) {
        res.json({
            ok: true,
            usuarios : usuarios
        });
      });
});

module.exports = app;