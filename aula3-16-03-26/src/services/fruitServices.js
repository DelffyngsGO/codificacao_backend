const fruits = require('../data/fruits.js')

const getById = (id) => {
    return fruits.find(f => f.id === parseInt(id))
}

module.exports = { getById }