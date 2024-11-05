const db = require('../../DB/mysql.js');
const usuarios = require('../usuarios');

const TABLA = 'clientes';
module.exports = function(dbInyectada) {

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql.js');
    }

    function todos () {
        return db.todos(TABLA);
    }
    
    function uno (id) {
        return db.uno(TABLA, id);
    }
    
    async function agregar(body) {
        const emailExistente = await db.query(TABLA, { email: body.email });
    
        if (emailExistente) {
            throw new Error('El correo electrónico ya está registrado.');
        }
    
        const clientes = {
            id_cliente: body.id,
            nombre: body.nombre,
            apellidos: body.apellidos,
            password: body.password,
            ciudad: body.ciudad,
            email: body.email,
            telefono: body.telefono,
            direccion: body.direccion
        };
    
        const respuesta = await db.agregar(TABLA, clientes);
    
        let insertId = body.id == 0 ? respuesta.insertId : body.id;
    
        let respuesta2 = '';
        if (body.usuario || body.password) {
            respuesta2 = await usuarios.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.password
            });
        }
    
        return respuesta2;
    }
    
    

    function editar (body) {
        return db.editar(TABLA, body);
    }
    
    function eliminar (body) {
        return db.eliminar(TABLA, body);
    }

    return {
        todos, 
        uno,
        agregar,
        editar,
        eliminar 
    }
}