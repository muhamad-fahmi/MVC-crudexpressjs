const mysql = require('mysql')
require('dotenv').config()
module.exports = mysql.createConnection({
    host : process.env.DBHOST,
    user : process.env.USERDB,
    password : process.env.DBPASS,
    database : process.env.DBNAME
})