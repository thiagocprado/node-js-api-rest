const connection = require('../database/connection')
const moment = require('moment')

class Service {
    save(service, res) {
        const createdAt = new Date()
        const scheduledDate = moment(service.scheduledDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const isValidDate = moment(scheduledDate).isSameOrAfter(createdAt)
        const isValidClient = service.client.length >= 5

        const validations = [
            {
                name: 'data',
                valid: isValidDate,
                message: 'Data deve ser maior ou igual a data atual',
            },
            {
                name: 'cliente',
                valid: isValidClient,
                message: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const errors = validations.filter(field => !field.valid)
        const hasErrors = errors.length

        const scheduled = { ...service, createdAt, scheduledDate }

        const sql = 'INSERT INTO Services SET ?'

        if (hasErrors) {
            res.status(400).json(errors)
        } else {
            connection.query(sql, scheduled, (error, results) => {
                if (error) {
                    res.status(400).json(error);
                } else {
                    res.status(200).json(service)
                }
            })
        }
    }

    get(res) {
        const sql = 'SELECT * FROM Services'

        connection.query(sql, (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results)
            }
        })
    }

    getOnly(id, res) {
        const sql = `SELECT * FROM Services WHERE id=${id}`

        connection.query(sql, (error, results) => {
            const service = results[0]

            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(service)
            }
        })
    }

    update(id, service, res) {
        if (service.scheduledDate) {
            service.scheduledDate = moment(service.scheduledDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }


        const sql = `UPDATE Services SET ? WHERE id=?`

        connection.query(sql, [service, id], (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({...service, id})
            }
        })
    }

    delete(id, res) {
        const sql = 'DELETE FROM Services WHERE id=?'

        connection.query(sql, id, (error, results) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Service

//  conexão com o banco de dados e algumas validações de regra de negócios