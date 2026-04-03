import express from 'express'
import { pizzaService } from '../services/pizzaServices.js'

const route = express.Router()

route.get('/', (req, res) => {
    res.json(pizzaService.getAll())
})

route.post('/', (req, res) => {
    const { nome, tamanho, preço } = req.body
    const data = { nome, tamanho, preço }

    if (!data.nome | !data.tamanho | !data.preço) {
        return res.status(404).json({ message: 'É necessário informar o nome do pizza, tamanho e preço para adicionar a pizza' })
    }

    const newPizza = pizzaService.create(data)

    res.json(newPizza)
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    const pizza = pizzaService.getById(id)

    if (!pizza) {
        return res.status(404).json({
            msg: 'Pizza não encontrada'
        })
    } res.json(pizza)
})

route.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const { tamanho } = req.body;
    const { preço } = req.body;

    const pizzaUpd = pizzaService.updatePatch(id, nome, tamanho, preço);

    if (!pizzaUpd) {
        return res.status(404).json({ message: 'Pizza não encontrada para atualização' });
    }

    res.json(pizzaUpd);
});

route.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const { tamanho } = req.body;
    const { preço } = req.body;

    if (!nome) {
        return res.status(400).json({ message: 'Dados insuficientes para substituição (nome, tamanho e preço são obrigatórios)' });
    }

    if (!tamanho) {
        return res.status(400).json({ message: 'Dados insuficientes para substituição (nome, tamanho e preço são obrigatórios)' });
    }

    if (!preço) {
        return res.status(400).json({ message: 'Dados insuficientes para substituição (nome, tamanho e preço são obrigatórios)' });
    }

    const pizzaUpd = pizzaService.updatePut(id, { nome, tamanho, preço });

    if (!pizzaUpd) {
        return res.status(404).json({ message: 'Pizza não encontrada para substituição' });
    }

    res.json(pizzaUpd);
});

route.delete('/:id', (req, res) => {
    const { id } = req.params;

    const deleted = pizzaService.delete(id);

    if (!deleted) {
        return res.status(404).json({ message: 'Pizza não encontrada' });
    }

    res.status(204).send();
});


export default route