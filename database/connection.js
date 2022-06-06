const mysql = require('mysql')

const connection = mysql.createConnection({ // faz a conexão do nosso BD
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'admin',
    database: 'agenda-petshop'
})

module.exports = connection