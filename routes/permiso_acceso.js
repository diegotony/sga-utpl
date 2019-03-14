const express = require('express')
const app = express();
const PermisonAcceso = require('../models/permiso_acceso');

//  GET LIST

app.get('/permiso/', (req, res) => {
    PermisonAcceso.find({
            state: true
        })
        .exec((err, permisos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                permisos
            });
        });

});


// GET ID ROL


app.get('/permiso/:id', (req, res) => {
    id = req.params.id;
    PermisonAcceso.findById(id, (err, permisoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!permisoDB) {
            return res.status(500).json({
                ok: false,
                err: "El id no es correcto"
            });
        }
        res.json({
            ok: true,
            permisoDB
        });
    });

});


// POST ROL

app.post('/permiso', (req, res) => {
    let body = req.body;
    let permiso = new PermisonAcceso({
        name: body.name,
        user: body.user,
        sala: body.sala,
    });



    permiso.save((err, permisoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!permisoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            rol: permisoDB
        });

    });


});

app.put('/permiso/:id', (req, res) => {
    let id = req.params.id;

    let body = req.body;

    let nombrePermiso = {
        name: body.name,
        user: body.user,
        sala: body.sala,
    };

    PermisonAcceso.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, permisoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!permisoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            sala: permisoDB
        });
    });

});


app.delete('/permiso/:id', (req, res) => {
    let id = req.params.id;

    let cambiaState = {
        state: false
    }

    PermisonAcceso.findByIdAndUpdate(id, cambiaState, {
        new: true,
    }, (err, permisoBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!permisoBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Permiso no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            sala: permisoBorrada
        });
    });
});


module.exports = app