const mysql = require('mysql2');
const db = mysql.createConnection(
    { 
    host: 'localhost',
    user: 'root',
    password: 'Byanymeans333811#',
  //  database: 'work'
    },
    console.log ('connected to work database!')
);

module.exports = db;