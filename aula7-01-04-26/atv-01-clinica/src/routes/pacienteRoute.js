import express from 'express'
import { pacienteService } from '../services/pacienteService.js'

const route = express.Router()

route.get('/', (req, res) => {
    res.json(pacienteService.getAll())
})

route.post('/', (req, res) => {
    const { nome, idade, sintoma } = req.body
    const data = { nome, idade, sintoma }

    if (!data.nome | !data.idade | !data.sintoma) {
        return res.status(404).json({ message: 'É necessário informar o nome do paciente, idade e sintoma para adicionar o paciente' })
    }

    const newPaciente = pacienteService.create(data)

    res.json(newPaciente)
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    const paciente = pacienteService.getById(id)

    if (!paciente) {
        return res.status(404).json({
            msg: 'Paciente não encontrado'
        })
    } res.json(paciente)
})

route.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const { idade } = req.body;
    const { sintoma } = req.body;

    const pacienteUpd = pacienteService.updatePatch(id, nome, idade, sintoma);

    if (!pacienteUpd) {
        return res.status(404).json({ message: 'Paciente não encontrado para atualização' });
    }

    res.json(pacienteUpd);
});

route.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const { idade } = req.body;
    const { sintoma } = req.body;

    if (!nome) {
        return res.status(400).json({ message: 'Dados insuficientes para substituição (nome, idade e sintoma são obrigatórios)' });
    }

    if (!idade) {
        return res.status(400).json({ message: 'Dados insuficientes para substituição (nome, idade e sintoma são obrigatórios)' });
    }

    if (!sintoma) {
        return res.status(400).json({ message: 'Dados insuficientes para substituição (nome, idade e sintoma são obrigatórios)' });
    }

    const pacienteUpd = pacienteService.updatePut(id, { nome, idade, sintoma });

    if (!pacienteUpd) {
        return res.status(404).json({ message: 'Paciente não encontrado para substituição' });
    }

    res.json(pacienteUpd);
});

route.delete('/:id', (req, res) => {
    const { id } = req.params;

    const deleted = pacienteService.delete(id);

    if (!deleted) {
        return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    res.status(204).send();
});


export default route