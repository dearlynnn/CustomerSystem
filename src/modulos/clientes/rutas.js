const express = require('express');
const respuesta = require('../../red/respuestas.js')

const router = express.Router();
const controlador =  require('./index.js')

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.patch(':/id', editar);
router.put('/', eliminar);

async function todos (req, res, next) {
    try{
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    }
};

async function uno (req, res, next) {
    try{
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    }catch(err){
        next(err);
    }
};

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        const mensaje = req.body.id == 0 ? 'Item guardado con éxito' : 'Item actualizado con éxito';
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        res.status(400).json({ message: err.message });
        next(err);
    }
}

async function eliminar (req, res, next) {
    try{
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Item eliminado satisfactoriamente', 200);
    }catch(err){
        next(err);
    }
};

async function editar(req, res, next) {
    try {
        const updatedItem = await controlador.editar(req.body);
        if (updatedItem) {
            const mensaje = 'Item actualizado con éxito';
            return res.status(200).json({
                message: mensaje,
                data: updatedItem
            });
        } else {
            return res.status(404).json({ error: 'Item no encontrado' });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = router;