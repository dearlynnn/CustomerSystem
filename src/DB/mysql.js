const mysql =  require('mysql2');
const config = require('../config.js')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err){
             console.log('[db err]', err);
             setTimeout(conMysql, 200)
        }else{
            console.log('¡DB conectada!')
        }
     });

    conexion.on('error', err => {
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();

function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function editar(tabla, data) {
    return new Promise((resolve, reject) => {
        let query = `UPDATE ${tabla} SET `;
        let params = [];
        let fields = [];

        // Recorrer el objeto 'data' para construir dinámicamente la consulta
        if (data.nombre) {
            fields.push('nombre = ?');
            params.push(data.nombre);
        }
        if (data.apellidos) {
            fields.push('apellidos = ?');
            params.push(data.apellidos);
        }
        if (data.password) {
            fields.push('password = ?');
            params.push(data.password);
        }
        if (data.ciudad) {
            fields.push('ciudad = ?');
            params.push(data.ciudad);
        }
        if (data.email) {
            fields.push('email = ?');
            params.push(data.email);
        }
        if (data.telefono) {
            fields.push('telefono = ?');
            params.push(data.telefono);
        }
        if (data.direccion) {
            fields.push('direccion = ?');
            params.push(data.telefono);
        }

        if (fields.length === 0) {
            return reject(new Error('No hay campos para actualizar'));
        }

        // Unir todos los campos generados dinámicamente
        query += fields.join(', ') + ' WHERE id = ?';
        params.push(data.id);  

        conexion.query(query, params, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

function eliminar(tabla, body) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tabla} WHERE id = ?`;
        conexion.query(query, [body.id], (err, result) => {
            if (err) {
                console.error('Error en la consulta DELETE:', err);
                return reject(err);
            }
            if (result.affectedRows === 0) {
                return reject(new Error('Producto no encontrado'));
            }
            resolve(result);
        });
    });
}


function query(tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    editar,
    query
}