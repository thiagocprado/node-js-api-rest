const Service = require('../models/services')

module.exports = app => {
    app.get('/atendimentos', (req, res) =>
        Service.get(res)
    )

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Service.getOnly(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const service = req.body
        Service.save(service, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const service = req.body

        Service.update(id, service, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Service.delete(id, res)
    })
}

// controle de rotas e  decidirá qual será a requisição