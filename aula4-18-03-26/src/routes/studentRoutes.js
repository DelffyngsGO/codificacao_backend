import express from 'express'

const route = express.Router()

route.get('/', (req, res) => {
    res.json(studentServices.getAll())
})

export default route