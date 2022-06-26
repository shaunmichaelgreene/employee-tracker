const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shauncodes1986',
    database: 'employees'
    }, 
    console.log("You are now connected to the Employee database!")
);

module.exports = db;