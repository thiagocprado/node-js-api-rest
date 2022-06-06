const customExpress = require('./config/customExpress')
const connection = require('./database/connection')
const Tables = require('./database/tables')

connection.connect((error) => { // faz a conexão com o banco de dados
    if(error) {
        console.error(error)
    } else {
        Tables.init(connection) // cria nossas tabelas
        const app = customExpress() // pega as configurações personalizadas do express
        app.listen(3000, () => console.log('Server listening on port: 3000')) // cria o servidor
    }
})

