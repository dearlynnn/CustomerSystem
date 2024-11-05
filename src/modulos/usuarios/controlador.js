const db = require('../../DB/mysql.js');
const usuarios = require('./index.js');

const TABLA = 'usuario';

module.exports = function(dbInyectada) {
    let db = dbInyectada;

    if (!db) {
        db = require('../../DB/mysql.js');
    }

    function todos() {
        return db.todos(TABLA);
    }

    function uno(id) {
        return db.uno(TABLA, id);
    }

    async function login(usuario, password) {
        const query = { usuario };
        const user = await db.query(TABLA, query);
    
        if (user && user.password === password) {
            return { success: true, message: 'Login exitoso', user };
        } else {
            throw new Error('Usuario o contraseña incorrectos');
        }
    }   

    async function agregar(body) {
        return db.agregar(TABLA, body);
    }

    function eliminar(body) {
        return db.eliminar(TABLA, body);
    }

    return {
        todos,
        uno,
        agregar,
        login,
        eliminar
    };
};
