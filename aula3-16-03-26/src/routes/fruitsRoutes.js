const express = require('express')

const fruitRouter = express.Router()

const fruitServices = require('../services/fruitServices')

fruitRouter.get('/:id', (req, res) => {
    const fruit = fruitServices.getById(req.params.id)

    if (!fruit) {
        return res.status(404).json({
            message: 'Fruta não encontrada'
        })
    }

    res.json(fruit)
})

fruitRouter.get('/', (req, res) => {
    const fruits = require('../data/fruits')
    res.json(fruits)
})

module.exports = fruitRouter