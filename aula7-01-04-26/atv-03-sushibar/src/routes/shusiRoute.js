import express from 'express'
import { sushiService } from '../services/sushiServices.js'

const route = express.Router()

route.get('/', (req, res) => {
    res.json(sushiService.getAll())
})

route.post('/', (req, res) => {
    const { nome, peso } = req.body
    const data = { nome, peso }

    if (!data.nome | !data.peso) {
        return res.status(404).json({ message: 'É necessário informar o nome e peso(gramas) do sushi para aicioná-lo' })
    }

    const newSushi = sushiService.create(data)

    res.json(newSushi)
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    const sushi = sushiService.getById(id)

    if (!sushi) {
        return res.status(404).json({
            msg: 'Sushi não encontrado'
        })
    } res.json(sushi)
})

route.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const { peso } = req.body;

    const sushiUpd = sushiService.updatePatch(id, nome, peso);

    if (!sushiUpd) {
        return res.status(404).json({ message: 'Sushi não encontrada para atualização' });
    }

    res.json(sushiUpd);
});

route.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const { peso } = req.body;

    if (!nome) {
        return res.status(400).json({ message: 'Dados insuficientes para substituição (nome e peso são obrigatórios)' });
    }

    if (!peso) {
        return res.status(400).json({ message: 'Dados insuficientes para substituição (nome e peso são obrigatórios)' });
    }

    const sushiUpd = sushiService.updatePut(id, { nome });

    if (!sushiUpd) {
        return res.status(404).json({ message: 'Sushi não encontrado para substituição' });
    }

    res.json(sushiUpd);
});

route.delete('/:id', (req, res) => {
    const { id } = req.params;

    const deleted = sushiService.delete(id);

    if (!deleted) {
        return res.status(404).json({ message: 'Sushi não encontrado' });
    }

    res.status(204).send();
});


export default route