const express = require('express');
const respuesta = require('../../red/respuestas.js');
const router = express.Router();
const controlador = require('./index.js');

router.get('/', todos);
router.get('/:id', uno);
router.post('/login', login);
router.post('/', agregar);
router.put('/', eliminar);

async function todos(req, res, next) {
    try {
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

async function uno(req, res, next) {
    try {
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { usuario, password } = req.body;
        const result = await controlador.login(usuario, password);
        respuesta.success(req, res, result, 200);
    } catch (err) {
        respuesta.error(req, res, 'Usuario o contraseña incorrectos', 401);
    }
}

async function eliminar(req, res, next) {
    try {
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Item eliminado satisfactoriamente', 200);
    } catch (err) {
        next(err);
    }
}

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        const mensaje = req.body.id == 0 ? 'Item guardado con éxito' : 'Item actualizado con éxito';
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }
}

module.exports = router;
