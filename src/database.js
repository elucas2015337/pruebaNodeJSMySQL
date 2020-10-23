const mysql = require('mysql');
const { database } = require('./keys');
const pool = mysql.createPool(database);
const { promisify } = require('util');

//Mostrar errores y conexión con la base de datos
pool.getConnection((err, connection)=>{
    if (err) {
        if (err.code === 'PROTOCOL_CONECTION_LOST') {
            console.error('La conexión con la base de datos fue cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.erro('La base de datos tiene muchas conexiones')
        }
        if (err.code === 'ECONNREFUSED') {
            console.erro('La conexión con la base de datos fué rechazada')
        }
    }
    if (connection) connection.release();
    console.log('Base de datos conectada');
    return;
})
//conversión de callbacks a promesas
pool.query = promisify(pool.query);
module.exports = pool;