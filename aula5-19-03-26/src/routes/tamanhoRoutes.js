import express from 'express'
import { tamanhoService } from '../services/tamanhoService.js'

const route = express.Router()

route.get('/', (req, res) => {
    res.json(tamanhoService.getAll())
})

export default route