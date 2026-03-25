import express from 'express'
import { filmesService } from '../services/filmesService.js'

const route = express.Router()

route.get('/', (req, res) => {
    res.json(filmesService.getAll())
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    const filme = filmesService.getById(id)

    if (!filme) {
        return res.status(404).json({
            message: 'Filme não encontrado'
        })
    } res.json(filme)
})

export default route