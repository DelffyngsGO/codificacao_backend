import express from 'express'
import { studentsService } from '../services/studentsService.js'

const route = express.Router()

route.get('/', (req, res) => {
    res.json(studentsService.getAll())
})

export default route