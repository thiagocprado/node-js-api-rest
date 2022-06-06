const express = require('express')
const consign = require('consign')  // o consign arquiva todas as rotas de requisições em um único lugar
const bodyParser = require('body-parser')

module.exports = () => {
    const app = express()
    
    // middleware
    app.use(bodyParser.json())

    consign()
    .include('controllers')
    .into(app)

    return app
}

// configurações do express