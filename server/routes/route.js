const express = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();


app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({ estado: true }, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    totalRegistros: conteo,
                    usuarios                    
                });
            });
            
        });
});

app.post('/usuario', function (req, res) {
    let body = req.body;

    //creamos el schema usuario con los datos que vienen del request
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), // Se encripta el password del usuario con bcrypt 
        role: body.role
    });

    // almacenamos el usuario en la base de datos, gestionamos los errores
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    // aceptamos solo algunas propiedades para actualizar
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    // eliminar attr que no queremos actualizar
    // delete body.password;
    // delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});

app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;

    let body = {
        estado : false,
    }

    //Eliminación logica
    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                error : {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

/*  
    Eliminación fisica
    Usuario.findByIdAndRemove(id, (err, deletedUser) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!deletedUser) {
            return res.status(400).json({
                ok: false,
                error : {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: deletedUser
        })
    }); */
});

app.get('/usuarios', function (req, res) {
    Usuario.find().lean().exec(function (err, usuarios) {
        res.json({
            ok: true,
            usuarios: usuarios
        });
    });
});

module.exports = app;