import express from 'express'
import { fruitServices } from '../services/fruitServices.js'

const route = express.Router()

route.get('/', (req, res) => {
    res.json(fruitServices.getAll())
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    const fruit = fruitServices.getById(id)

    if (!fruit) {
        return res.status(404).json({
            message: 'Fruta não encontrada'
        })
    } res.json(fruit)
})

route.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    const fruitUpd = fruitServices.updatePatch(id, nome);

    if (!fruitUpd) {
        return res.status(404).json({ message: 'Fruta não encontrada para atualização' });
    }

    res.json(fruitUpd);
});

route.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ message: 'Dados insuficientes para substituição (nome obrigatório)' });
    }

    const fruitUpd = fruitServices.updatePut(id, { nome });

    if (!fruitUpd) {
        return res.status(404).json({ message: 'Fruta não encontrado para substituição' });
    }

    res.json(fruitUpd);
});

export default route