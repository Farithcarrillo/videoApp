const mysql = require('mysql');
const config = require('../config');
const authTable = 'authentication';

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}
 
let connection;

function connectToMySQL() {
    connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(connectToMySQL, 200);
        } else {
            console.log('DB Conectada!!');
        }
    });

    connection.on('error', (err) => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectToMySQL();
        } else {
            throw err;
        }
    });
}

connectToMySQL();

function getAll(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function getById(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (error, results) => {
            if (error) {
            reject(error);
            } else {
            resolve(results);
            }
        });
    });
}

function addOrUpdate(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (error, results) => {
            if (error) {
            reject(error);
            } else {
            resolve(results);
            }
        });
    });
}

function deleteById(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id= ?`, data.id, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
                connection.query(`DELETE FROM ${authTable} WHERE id= ?`, data.id, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    
                    }
                });
            }
        });
    });
}

function query(table, condition) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, condition, (error, results) => {
            if (error) {
            reject(error);
            } else {
            resolve(results[0]);
            }
        });
    });
}

module.exports = {
    getAll,
    getById,
    addOrUpdate,
    deleteById,
    query
}